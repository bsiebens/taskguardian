<script>
	import { activeTab } from './stores';

	/**
	 * @type {string}
	 */
	export let tabName;

	function setActiveTab() {
		$activeTab = tabName;
	}
</script>

{#if $activeTab === tabName}
	<a class="tab tab-active" href="/" on:click={setActiveTab}>
		{#if tabName === 'next'}
			<i class="fa-solid fa-play mr-2" />
		{:else if tabName === 'later'}
			<i class="fa-solid fa-clock mr-2" />
		{:else if tabName === 'recurring'}
			<i class="fa-solid fa-repeat mr-2" />
		{:else if tabName === 'completed'}
			<i class="fa-solid fa-square-check mr-2" />
		{:else if tabName === 'deleted'}
			<i class="fa-solid fa-trash mr-2" />
		{:else}
			<i class="fa-solid fa-circle-question mr-2" />
		{/if}
		<span class="uppercase">{tabName}</span>
	</a>
{:else}
	<a class="tab" href="/" on:click={setActiveTab}>
		{#if tabName === 'next'}
			<i class="fa-solid fa-play mr-2" />
		{:else if tabName === 'later'}
			<i class="fa-solid fa-clock mr-2" />
		{:else if tabName === 'recurring'}
			<i class="fa-solid fa-repeat mr-2" />
		{:else if tabName === 'completed'}
			<i class="fa-solid fa-square-check mr-2" />
		{:else if tabName === 'deleted'}
			<i class="fa-solid fa-trash mr-2" />
		{:else}
			<i class="fa-solid fa-circle-question mr-2" />
		{/if}
		<span class="uppercase">{tabName}</span>
	</a>
{/if}
