<script>
	import { IconPlus, IconRefresh } from '@tabler/icons-svelte';
	import Button from '../lib/Button.svelte';
	import TaskList from '../lib/TaskList.svelte';
	import { tasks } from '../lib/stores';

	export let data;

	let filter = 'next';
	
	$: tasks.set(data.tasks[filter])
</script>

<div class='container mx-auto p-8 space-y-8'>
	<h1>Task overview</h1>

	<div class='flex'>
		<div class='flex-auto flex gap-2'>
			<Button name='next' bind:filter />
			<Button name='later' bind:filter />
			<Button name='recurring' bind:filter />
			<Button name='completed' bind:filter />
			<Button name='deleted' bind:filter />
		</div>

		<div class='flex gap-2'>
			<button class='btn variant-filled-secondary'>
				<IconRefresh />
				<span class='uppercase'>sync</span>
			</button>
			<button class='btn variant-filled-primary'>
				<IconPlus />
				<span class='uppercase'>add</span>
			</button>
		</div>
	</div>

	<TaskList />
</div>