<script>
	import { getNotificationsContext } from 'svelte-notifications';
	import { activeTab, tasks } from '../lib/stores';
    import TaskList from '../lib/TaskList.svelte';

	const { addNotification } = getNotificationsContext();

	/**
	 * @type {{ tasks: { next: any; }; }}
	 */
	export let data;

    $: tasks.set(data.tasks[$activeTab])
</script>

<TaskList pendingTasks={data.tasks['pending']} />