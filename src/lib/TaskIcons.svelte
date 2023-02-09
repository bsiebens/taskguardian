<script>
	import { convertTaskwarriorDateToISO8601Format } from './utilities';
	import { IconCheckbox, IconTrash, IconAlertCircle, IconAlertTriangle, IconLock } from '@tabler/icons-svelte';
	import { activeTab } from './stores';

	/**
	 * @type {import('taskwarrior-lib').Task}
	 */
	export let task;
	/**
	 * @type {any}
	 */
	export let pendingTasks;

	/**
	 * @param {import('taskwarrior-lib').Task} task
	 */
	function isTaskOverDue(task) {
		if (task.status === 'completed') return false;
		if (task.status === 'deleted') return false;
		// @ts-ignore
		return new Date(convertTaskwarriorDateToISO8601Format(task.due)) < new Date();
	}

	/**
	 * @param {import('taskwarrior-lib').Task} task
	 */
	function isTaskDueInNext24Hours(task) {
		if (task.status === 'completed') return false;
		if (task.status === 'deleted') return false;
		// @ts-ignore
		return new Date(convertTaskwarriorDateToISO8601Format(task.due)) - new Date() <= 24 * 60 * 60 * 1000;
	}

	/**
	 * @param {import('taskwarrior-lib').Task} task
	 * @param {string[]} pendingTasks
	 */
	function isTaskBlocked(task, pendingTasks) {
		if (task.depends === undefined) return false;

		let blocked = false;
		task.depends.forEach((dependency) => {
			if (pendingTasks.includes(dependency)) {
				blocked = true;
			}
		});

		return blocked;
	}
</script>

{#if $activeTab != 'recurring'}
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

			{#if isTaskBlocked(task, pendingTasks)}
				<IconLock />
			{/if}
		{/if}
	</div>
{/if}
