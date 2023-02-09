<script>
	// @ts-nocheck
	import { IconAlertOctagon, IconAlertTriangle, IconCheckbox, IconX } from '@tabler/icons-svelte';

	export let notification = {};
	/**
	 * @type {() => void}
	 */
	export let onRemove;

	const handleButtonClick = () => {
		onRemove();
	};

	let successClass = 'alert alert-success shadow-lg my-8';
	let warningClass = 'alert alert-warning shadow-lg my-8';
	let errorClass = 'alert alert-error shadow-lg my-8';
	let alertClass = successClass;

	$: if (notification.type === 'error') alertClass = errorClass;
	$: if (notification.type === 'warning') alertClass = warningClass;
</script>

<div class={alertClass} style="width: 500px; margin-left: -50px;">
	<div>
		{#if notification.type === 'success'}
			<IconCheckbox class="mr-2 h-8 w-8" />
		{:else if notification.type === 'warning'}
			<IconAlertTriangle class="mr-2 h-8 w-8" />
		{:else}
			<IconAlertOctagon class="mr-2 h-8 w-8" />
		{/if}
		{#if notification.heading != undefined}
			<div>
				<h3 class="font-bold">{notification.heading}</h3>
				<div class="font-xs">{notification.description}</div>
			</div>
		{:else}
			<span>{notification.description}</span>
		{/if}
	</div>
	<div class="flex-none">
		<button class="btn-ghost btn-square btn-sm btn" on:click={handleButtonClick}>
			<IconX />
		</button>
	</div>
</div>
