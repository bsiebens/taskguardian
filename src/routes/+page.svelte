<script lang="ts">
	import { taskList } from '../lib/stores';
	import TaskList from '../lib/TaskList.svelte';

	import type { PageData } from './$types';

	export let data: PageData;

	$: taskList.set(data.tasks);
</script>

<div class="mt-8">
	<TaskList />
</div>
