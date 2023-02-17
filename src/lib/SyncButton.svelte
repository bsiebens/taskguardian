<script lang="ts">
	import { getNotificationsContext } from 'svelte-notifications';
	import { enhance } from '$app/forms';
	import { invalidate } from '$app/navigation';
	import { IconRefresh } from '@tabler/icons-svelte';

	const { addNotification } = getNotificationsContext();
</script>

<form
	method="post"
	action="?/sync"
	use:enhance={() => {
		return async ({ result }) => {
			addNotification({
				description: result.data.message,
				type: result.data.type,
				heading: 'Sync status',
				position: 'bottom-center',
				removeAfter: 10 * 1000
			});

			await invalidate('taskwarrior:data');
		};
	}}
>
	<button type="submit" class="btn-secondary btn w-28">
		<IconRefresh class="mr-1" />sync
	</button>
</form>
