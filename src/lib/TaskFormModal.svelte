<script lang="ts">
	import { getNotificationsContext } from 'svelte-notifications';
	import { enhance } from '$app/forms';
	import { invalidate } from '$app/navigation';

	import type { Task } from 'taskwarrior-lib';

	export let modalID: string;
	export let task: Task;

	let isModalOpen = false;

	const { addNotification } = getNotificationsContext();
</script>

<input type="checkbox" id={modalID} class="modal-toggle" bind:checked={isModalOpen} />

<div class="modal modal-bottom sm:modal-middle">
	<div class="modal-box sm:w-10/12 sm:max-w-5xl">
		<h3 class="mb-1 text-lg font-bold">Task</h3>

		<form method="post" class="space-y-2" action="?/update">bla</form>
	</div>
</div>
