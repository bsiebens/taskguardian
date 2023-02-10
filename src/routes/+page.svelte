<script>
	import { getNotificationsContext } from 'svelte-notifications';
	import { activeTab, tasks, projects } from '../lib/stores';
	import TaskList from '../lib/TaskList.svelte';

	const { addNotification } = getNotificationsContext();

	/**
	 * @type {{ tasks: { next: any; }; }}
	 */
	export let data;
	let detailedSelectDisabled = true;
	let level1Selector = 'all';
	let level2Selector = 'all';
	let level2Projects = [];

	$: tasks.set(data.tasks[$activeTab]);
	$: projects.set(data.projects);
	$: level2Projects = level1Selector === 'all' ? [] : $projects.level2[level1Selector];
	$: detailedSelectDisabled = level1Selector === 'all' ? true : false;
	$: level2Selector = level1Selector;
</script>

<div class="mt-4">
	<div class="flex flex-row place-content-end gap-x-2">
		<select class="select-bordered select w-full max-w-xs" bind:value={level1Selector} on:change={() => console.log(level1Selector)}>
			<option value="all" selected>all tasks</option>
			{#each $projects.level1.sort() as project}
				<option value={project}>{project}</option>
			{/each}
		</select>

		<select class="select-bordered select w-full max-w-xs" disabled={detailedSelectDisabled} bind:value={level2Selector} on:change={() => console.log(level2Selector)}>
			<option value={level1Selector} selected>all tasks</option>
			{#each level2Projects.sort() as project}
				<option value={project}>{project}</option>
			{/each}
		</select>
	</div>
</div>

<!-- <TaskList pendingTasks={data.tasks['pending']} /> -->
