<script>
	import { getNotificationsContext } from 'svelte-notifications';
	import { enhance } from '$app/forms';
	import { invalidateAll } from '$app/navigation';

	const { addNotification } = getNotificationsContext();
</script>

<form
	method="post"
	action="?/sync"
	use:enhance={({ form, data, action, cancel }) => {
		return async ({ result, update }) => {
			console.log('Running');
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
	<button type="submit" class="btn-secondary btn w-24">
		<i class="fa-solid fa-refresh mr-2" />sync
	</button>
</form>
