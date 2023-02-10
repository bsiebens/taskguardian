<script>
	import { IconPencil, IconPlaylistAdd, IconCheck, IconTrash, IconArrowBackUp, IconTrashOff } from '@tabler/icons-svelte';
	import TaskFormModal from './TaskFormModal.svelte';
	import TaskAnnotationFormModal from './TaskAnnotationFormModal.svelte';
	import { getNotificationsContext } from 'svelte-notifications';
	import { enhance } from '$app/forms';
	import { invalidateAll } from '$app/navigation';

	/**
	 * @type {import('taskwarrior-lib').Task}
	 */
	export let task;

	const { addNotification } = getNotificationsContext();

	$: taskModalID = 'editTask' + task.uuid;
	$: taskAnnotationModalID = 'annotateTask' + task.uuid;
</script>

<TaskFormModal id={taskModalID} {task} />
<TaskAnnotationFormModal id={taskAnnotationModalID} />

<form
	method="post"
	action="?/form"
	use:enhance={({ form, data, action, cancel }) => {
		return async ({ result, update }) => {
			addNotification({
				// @ts-ignore
				description: result.data.message,
				// @ts-ignore
				type: result.data.type,
				heading: result.data.heading,
				position: 'bottom-center',
				removeAfter: 10 * 1000
			});
			await invalidateAll();
		};
	}}
>
	<input type="hidden" value={task.uuid} name="id" />
	<div class="flex flex-row">
		{#if task.status === 'completed'}
			<button type="submit" formaction="?/incompleted" class="btn-ghost btn-sm btn"><IconArrowBackUp /></button>
			<button type="submit" formaction="?/deleted" class="btn-ghost btn-sm btn"><IconTrash /></button>
		{:else if task.status === 'deleted'}
			<button type="submit" formaction="?/restored" class="btn-ghost btn-sm btn"><IconTrashOff /></button>
		{:else}
			<label class="btn-ghost btn-sm btn" for={taskModalID}><IconPencil /></label>
			<label class="btn-ghost btn-sm btn" for={taskAnnotationModalID}><IconPlaylistAdd /></label>
			<button type="submit" formaction="?/completed" class="btn-ghost btn-sm btn"><IconCheck /></button>
			<button type="submit" formaction="?/deleted" class="btn-ghost btn-sm btn"><IconTrash /></button>
		{/if}
	</div>
</form>
