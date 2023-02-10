<script>
	import { IconPencil, IconPlaylistAdd, IconCheck, IconTrash, IconArrowBackUp, IconTrashOff } from '@tabler/icons-svelte';
	import TaskFormModal from './TaskFormModal.svelte';

	/**
	 * @type {import('taskwarrior-lib').Task}
	 */
	export let task;

	$: taskModalID = 'editTask' + task.uuid;
</script>

<TaskFormModal id={taskModalID} {task} />

<div class="flex flex-row">
	{#if task.status === 'completed'}
		<button class="btn-ghost btn-sm btn"><IconArrowBackUp /></button>
		<button class="btn-ghost btn-sm btn"><IconTrash /></button>
	{:else if task.status === 'deleted'}
		<button class="btn-ghost btn-sm btn"><IconTrashOff /></button>
	{:else}
		<label class="btn-ghost btn-sm btn" for={taskModalID}><IconPencil /></label>
		<button class="btn-ghost btn-sm btn"><IconPlaylistAdd /></button>
		<button class="btn-ghost btn-sm btn"><IconCheck /></button>
		<button class="btn-ghost btn-sm btn"><IconTrash /></button>
	{/if}
</div>
