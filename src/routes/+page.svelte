<script>
	import { enhance } from '$app/forms';
	import { invalidateAll } from '$app/navigation';
	import { getNotificationsContext } from 'svelte-notifications';

	const { addNotification } = getNotificationsContext();

	/**
	 * @type {{ tasks: { next: any; }; }}
	 */
	export let data;
</script>

<form
	method="post"
	action="?/sync"
	use:enhance={({ form, data, action, cancel }) => {
		return async ({ result, update }) => {
			addNotification({
				// @ts-ignore
				description: result.data.message,
				// @ts-ignore
				type: result.data.type,
				heading: 'Sync status',
				position: 'bottom-center',
				removeAfter: 10 * 1000
			});
			await invalidateAll();
		};
	}}
>
	<button class="btn" type="submit">sync</button>
</form>

<ul>
	{#each data.tasks.next as task}
		<li>{task.description}</li>
	{/each}
</ul>
