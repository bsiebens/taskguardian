<script lang="ts">
	import { taskList } from '../lib/stores';

	import type { PageData } from './$types';

	export let data: PageData;

	$: taskList.set(data.tasks);
</script>
