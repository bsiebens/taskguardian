<script>
	import { IconPencil, IconPlaylistAdd, IconCheck, IconTrash, IconArrowBackUp, IconTrashOff, IconArrowBack } from '@tabler/icons-svelte';
	import TaskFormModal from './TaskFormModal.svelte';

	/**
	 * @type {import('taskwarrior-lib').Task}
	 */
	export let task;

	$: taskModalID = 'editTask' + task.uuid;
</script>

<TaskFormModal id={taskModalID} />
