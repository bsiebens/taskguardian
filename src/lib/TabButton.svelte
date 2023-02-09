<script>
	import { activeTab } from './stores';
	import { IconPlayerPlay, IconClockHour2, IconRepeat, IconCheckbox, IconTrash, IconCircleDashed } from '@tabler/icons-svelte';

	/**
	 * @type {string}
	 */
	export let tabName;

	function setActiveTab() {
		$activeTab = tabName;
	}
</script>

{#if $activeTab === tabName}
	<a class="tab tab-active grow lg:tab-bordered" href="/" on:click={setActiveTab}>
		{#if tabName === 'next'}
			<IconPlayerPlay class="mr-2" />
		{:else if tabName === 'later'}
			<IconClockHour2 class="mr-2" />
		{:else if tabName === 'recurring'}
			<IconRepeat class="mr-2" />
		{:else if tabName === 'completed'}
			<IconCheckbox class="mr-2" />
		{:else if tabName === 'deleted'}
			<IconTrash class="mr-2" />
		{:else}
			<IconCircleDashed class="mr-2" />
		{/if}
		<span class="uppercase">{tabName}</span>
	</a>
{:else}
	<a class="tab grow lg:tab-bordered" href="/" on:click={setActiveTab}>
		{#if tabName === 'next'}
			<IconPlayerPlay class="mr-2" />
		{:else if tabName === 'later'}
			<IconClockHour2 class="mr-2" />
		{:else if tabName === 'recurring'}
			<IconRepeat class="mr-2" />
		{:else if tabName === 'completed'}
			<IconCheckbox class="mr-2" />
		{:else if tabName === 'deleted'}
			<IconTrash class="mr-2" />
		{:else}
			<IconCircleDashed class="mr-2" />
		{/if}
		<span class="uppercase">{tabName}</span>
	</a>
{/if}
