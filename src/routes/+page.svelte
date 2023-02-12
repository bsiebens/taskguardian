<script lang="ts">
	import { taskList } from '$lib/stores';

	import type { PageData } from './$types';

	export let data: PageData;

	$: taskList.set(data.tasks);
</script>

{$taskList}

<!-- <script>
	import { getNotificationsContext } from 'svelte-notifications';
	import { activeTab, tasks, taskList, pendingTasks, filteredTasks, taskFilter } from '../lib/stores';
	import TaskList from '../lib/TaskList.svelte';

	const { addNotification } = getNotificationsContext();

	/**
	 * @type {{ tasks: { next: any; }; }}
	 */
	export let data;

	$: tasks.set(data.tasks[$activeTab]);
	$: taskList.set(data.tasks['all']);
	$: taskFilter.set('recurring');
	$: console.log($filteredTasks);
</script>

<TaskList pendingTasks={data.tasks['pending']} /> -->
