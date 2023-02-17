<script lang="ts">
	import { IconAlertCircle, IconAlertTriangle, IconCheckbox, IconLock, IconPlayerPlay, IconTag, IconTrash, IconArrowsSort, IconArrowUp, IconArrowDown, IconPencil, IconPlaylistAdd, IconCheck, IconArrowBackUp, IconTrashOff } from '@tabler/icons-svelte';
	import moment from 'moment';
	import { filteredTasks, pendingTasks, taskFilter, taskSortingField, taskSortingDirection } from './stores';
	import { convertTaskwarriorDateToISO8601Format } from './utils';
	import { invalidate } from '$app/navigation';
	import { getNotificationsContext } from 'svelte-notifications';
	import { enhance } from '$app/forms';
	import TaskAnnotationFormModal from './TaskAnnotationFormModal.svelte';
	import TaskFormModal from './TaskFormModal.svelte';

	import type { Task } from 'taskwarrior-lib';

	let selectedTask: Task | undefined = undefined;
	let annotationTaskModalOpen: boolean = false;
	let formTaskModalOpen: boolean = false;

	const { addNotification } = getNotificationsContext();
	
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
		if (isTaskOverDue(task)) return 'hover text-error-content [&>*]:bg-error hover:text-base-content';
		if (isTaskDueInNext24Hours(task)) return 'hover text-warning-content [&>*]:bg-warning hover:text-base-content';
		
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

	function showTaskAnnotationModal(task: Task) {
		selectedTask = task;
		annotationTaskModalOpen = true;
	}

	function showTaskFormModal(task: Task) {
		selectedTask = task;
		formTaskModalOpen = true;
	}

	// Remove task when filter changes (as otherwise the table does not update properly)
	$: $taskFilter, removeSelectedTask();
</script>

<TaskAnnotationFormModal task={selectedTask} bind:isModalOpen={annotationTaskModalOpen}/>
<TaskFormModal task={selectedTask} bind:isModalOpen={formTaskModalOpen} modalID={"editTask"} />

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

						{#if task.annotations!= undefined && task.annotations.length > 0}
							<div>
								{#each task.annotations as annotation}
									<div class="ml-4 flex flex-row gap-x-4 text-sm">
										<div class="min-w-fit font-semibold">{moment(convertTaskwarriorDateToISO8601Format(annotation.entry)).fromNow()}</div>
										<div class="text-justify">{annotation.description}</div>
									</div>
								{/each}
							</div>
						{/if}

						{#if task.tags != undefined && (task.tags.length > 0 || (task.status === 'pending' && task.scheduled != undefined))}
							<div class="flex flex-row gap-x-1 mt-1">
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
					<td>
						<form method="post" action='?/form' use:enhance={({ form, data, action, cancel }) => {
							return async ({ result, update }) => {
								addNotification({
									description: result.data.message,
									type: result.data.type,
									heading: result.data.heading,
									position: 'bottom-center',
									removeAfter: 10 * 1000
								});
								await invalidate('taskwarrior:data');
							}
						}}>
							<input type='hidden' value={task.uuid} name='id' />

							{#if task.status === 'completed'}
								<button type='submit' formaction='?/complete' class='btn btn-ghost btn-sm'><IconArrowBackUp /></button>
								<button type='submit' formaction='?/delete' class='btn btn-ghost btn-sm'><IconTrash /></button>
							{:else if task.status === 'deleted'}
								<button type='submit' formaction='?/delete' class='btn btn-ghost btn-sm'><IconTrashOff /></button>
							{:else}
								<label class='btn btn-ghost btn-sm' on:click={() => showTaskFormModal(task)}><IconPencil /></label>
								<label class='btn btn-ghost btn-sm' on:click={() => showTaskAnnotationModal(task)}><IconPlaylistAdd /></label>
								<button type='submit' formaction='?/complete' class='btn btn-ghost btn-sm'><IconCheck /></button>
								<button type='submit' formaction='?/delete' class='btn btn-ghost btn-sm'><IconTrash /></button>
							{/if}
						</form>
					</td>
				</tr>
			{/each}
		</tbody>
	</table>
</div>
