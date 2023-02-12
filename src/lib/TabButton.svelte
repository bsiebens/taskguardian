<script lang="ts">
	import { taskFilter } from './stores';
	import { IconPlayerPlay, IconClockHour2, IconRepeat, IconCheckbox, IconTrash } from '@tabler/icons-svelte';

	import type { ComponentType } from 'svelte';

	export let buttonName: string;
	const buttonNameToIcon: { [buttonName: string]: ComponentType } = {
		next: IconPlayerPlay,
		later: IconClockHour2,
		recurring: IconRepeat,
		completed: IconCheckbox,
		deleted: IconTrash
	};

	function markActive() {
		taskFilter.set(buttonName);
	}
</script>

{#if $taskFilter === buttonName}
	<a class="tab tab-active grow lg:tab-bordered" href="/" on:click={markActive}>
		<svelte:component this={buttonNameToIcon[buttonName]} />
		<span class="ml-2 uppercase">{buttonName}</span>
	</a>
{:else}
	<a class="tab grow lg:tab-bordered" href="/" on:click={markActive}>
		<svelte:component this={buttonNameToIcon[buttonName]} />
		<span class="ml-2 uppercase">{buttonName}</span>
	</a>
{/if}
