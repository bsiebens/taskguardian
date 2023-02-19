<script lang="ts">
	import { IconCheckbox, IconClockHour2, IconInbox, IconPlayerPlay, IconRepeat, IconTrash } from '@tabler/icons-svelte';
	import { taskFilter, inboxTaskCount } from './stores';

	import type { ComponentType } from 'svelte';

	export let buttonName: string;
	const buttonNameToIcon: { [buttonName: string]: ComponentType } = {
		next: IconPlayerPlay,
		later: IconClockHour2,
		recurring: IconRepeat,
		completed: IconCheckbox,
		deleted: IconTrash,
		inbox: IconInbox
	};

	function markActive() {
		taskFilter.set(buttonName);
	}

	$: buttonNameIcon = buttonNameToIcon[buttonName];
</script>

{#if $taskFilter === buttonName}
	<a class="tab tab-active grow lg:tab-bordered" href="/" on:click={markActive}>
		<svelte:component this={buttonNameIcon} />
		<span class="ml-2 uppercase">{buttonName}</span>

		{#if buttonName === 'inbox'}
			<span class="badge-primary badge ml-1">{$inboxTaskCount}</span>
		{/if}
	</a>
{:else}
	<a class="tab grow lg:tab-bordered" href="/" on:click={markActive}>
		<svelte:component this={buttonNameIcon} />
		<span class="ml-2 uppercase">{buttonName}</span>

		{#if buttonName === 'inbox'}
			<span class="badge-primary badge ml-1">{$inboxTaskCount}</span>
		{/if}
	</a>
{/if}
