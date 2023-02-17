<script lang="ts">
	import { browser } from '$app/environment';
	import { IconAlertCircle, IconAlertTriangle, IconCheckbox, IconLock, IconPlayerPlay, IconTag, IconTrash, IconArrowsSort, IconArrowUp, IconArrowDown } from '@tabler/icons-svelte';
	import moment from 'moment';
	import { filteredTasks, pendingTasks, taskFilter, taskSortingField, taskSortingDirection } from './stores';
	import { convertTaskwarriorDateToISO8601Format } from './utils';

	import type { Task } from 'taskwarrior-lib';

	let selectedTask: Task | undefined = undefined;
	let sortingDirection = browser ? window.sessionStorage.getItem('sortingDirection') ?? 'desc' : 'desc';
	let sortingField = browser ? window.sessionStorage.getItem('sortingField') ?? 'urgency' : 'urgency';

	function selectTask(task: Task) {
		if (selectedTask != undefined && selectedTask.uuid != undefined) {
			document.getElementById(selectedTask.uuid)?.classList.toggle('active');
		}

		if (task.uuid != undefined) {
			document.getElementById(task.uuid)?.classList.toggle('active');
		}

		selectedTask = task;
	}

	function removeSelectedTask() {
		if (selectedTask != undefined && selectedTask.uuid != undefined) {
			document.getElementById(selectedTask.uuid)?.classList.toggle('active');
		}
		selectedTask = undefined;
	}

	function isTaskOverDue(task: Task) {
		if (task.status === 'completed') return false;
		if (task.status === 'deleted') return false;

		// @ts-ignore
		return new Date(convertTaskwarriorDateToISO8601Format(task.due)) < new Date();
	}

	function isTaskDueInNext24Hours(task: Task) {
		if (task.status === 'completed') return false;
		if (task.status === 'deleted') return false;

		return (
			// @ts-ignore
			new Date(convertTaskwarriorDateToISO8601Format(task.due)) - new Date() <= 24 * 60 * 60 * 1000
		);
	}

	export function isTaskBlocked(task: Task) {
		if (task.depends === undefined) return false;

		let blocked = false;
		task.depends.forEach((dependency) => {
			if ($pendingTasks.includes(dependency)) {
				blocked = true;
			}
		});

		return blocked;
	}

	function updateRowClass(task: Task) {
		if (task.status === 'completed' || task.status === 'deleted' || task.status === 'recurring') return 'hover';
		if (isTaskBlocked(task)) return 'hover text-neutral-content [&>*]:bg-neutral hover:text-base-content';
		// @ts-ignore
		if (new Date(convertTaskwarriorDateToISO8601Format(task.due)) <= new Date()) return 'hover text-error-content [&>*]:bg-error hover:text-base-content';
		if (
			// @ts-ignore
			new Date(convertTaskwarriorDateToISO8601Format(task.due)) - new Date() <=
			24 * 60 * 60 * 1000
		)
			return 'hover text-warning-content [&>*]:bg-warning hover:text-base-content';
		return 'hover';
	}

	function toggleSortingFieldAndDirection(field: "urgency" | "priority") {
		if (field === $taskSortingField) {
			$taskSortingDirection = $taskSortingDirection === 'asc' ? 'desc' : 'asc';
		} else {
			$taskSortingField = field;
			$taskSortingDirection = 'asc';
		}
	}

	// Remove task when filter changes (as otherwise the table does not update properly)
	$: $taskFilter, removeSelectedTask();
</script>

<div class="overflow-x-auto">
	<table class="table w-full">
		<thead>
			<tr>
				<th />
				<th>Description</th>
				<th>Project</th>
				<th on:click={() => toggleSortingFieldAndDirection('priority')}>
					<div class="flex flex-row">
						Priority
						{#if $taskSortingField === 'priority'}
							{#if $taskSortingDirection === 'asc'}
								<IconArrowUp class="ml-1 w-4 h-4" />
							{:else}
								<IconArrowDown class="ml-1 w-4 h-4" />
							{/if}
						{:else}
							<IconArrowsSort class="ml-1 w-4 h-4 text-base-300" />
						{/if}
					</div>
				</th>
				{#if $taskFilter != 'next'}
					<th>Wait</th>
				{/if}
				<th>Due</th>
				<th on:click={() => toggleSortingFieldAndDirection('urgency')}>
					<div class="flex flex-row">
						Urgency
						{#if $taskSortingField === 'urgency'}
							{#if $taskSortingDirection === 'asc'}
								<IconArrowUp class="ml-1 w-4 h-4" />
							{:else}
								<IconArrowDown class="ml-1 w-4 h-4" />
							{/if}
						{:else}
							<IconArrowsSort class="ml-1 w-4 h-4 text-base-300" />
						{/if}
					</div>
				</th>
				<th />
			</tr>
		</thead>
		<tbody>
			{#each $filteredTasks as task}
				<!-- <tr class={updateRowClass(task)} id={task.uuid} on:click={() => selectTask(task)}> -->
				<tr class={updateRowClass(task)} id={task.uuid}>
					<td>
						{#if $taskFilter != 'recurring'}
							<div class="flex flex-row">
								{#if task.status === 'completed' || task.status === 'deleted'}
									{#if task.status === 'completed'}
										<IconCheckbox class="text-success" />
									{:else}
										<IconTrash class="text-error" />
									{/if}
								{:else}
									{#if isTaskOverDue(task)}
										<IconAlertCircle />
									{:else if isTaskDueInNext24Hours(task)}
										<IconAlertTriangle />
									{/if}

									{#if isTaskBlocked(task)}
										<IconLock />
									{/if}
								{/if}
							</div>
						{/if}
					</td>
					<td class="whitespace-normal">
						{task.description}

						{#if task.tags != undefined && (task.tags.length > 0 || (task.status === 'pending' && task.scheduled != undefined))}
							<div class="flex flex-row gap-x-1">
								{#each task.tags as tag}
									<div class="badge-secondary badge gap-2 text-secondary-content">
										<IconTag class="h-4 w-4" />
										{tag}
									</div>
								{/each}

								{#if task.status == 'pending' && task.scheduled != undefined}
									<div class="badge-accent badge gap-2 text-accent-content">
										<IconPlayerPlay class="h-4 w-4" />
										{moment(convertTaskwarriorDateToISO8601Format(task.scheduled)).fromNow()}
									</div>
								{/if}
							</div>
						{/if}
					</td>
					<td>
						{#if task.project != undefined}
							{task.project.replace('.', ' / ')}
						{/if}
					</td>
					<td>
						{#if task.priority != undefined}
							{task.priority}
						{/if}
					</td>
					{#if $taskFilter != 'next'}
						<td>
							{#if task.wait != undefined}
								{moment(convertTaskwarriorDateToISO8601Format(task.wait)).fromNow()}
							{/if}
						</td>
					{/if}
					<td>
						{#if task.due != undefined}
							{moment(convertTaskwarriorDateToISO8601Format(task.due)).fromNow()}
						{/if}
					</td>
					<td>{task.urgency}</td>
					<td>// ACTIONS //</td>
				</tr>
			{/each}
		</tbody>
	</table>
</div>
