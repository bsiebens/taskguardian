<script>
	import { getNotificationsContext } from 'svelte-notifications';
	import { enhance } from '$app/forms';
	import { invalidateAll } from '$app/navigation';
	import { IconRefresh } from '@tabler/icons-svelte';

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
	<button type="submit" class="btn-secondary btn w-28">
		<IconRefresh class="mx-1" />sync
	</button>
</form>
