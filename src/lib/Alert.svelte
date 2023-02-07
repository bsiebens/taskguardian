<script>
	// @ts-nocheck

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
			<i class="fa-solid fa-circle-check mr-2 h-8 w-8" />
		{:else if notification.type === 'warning'}
			<i class="fa-solid fa-triangle-exclamation mr-2 h-8 w-8" />
		{:else}
			<i class="fa-solid fa-circle-exclamation mr-2 h-8 w-8" />
		{/if}
		<div>
			<h3 class="font-bold">{notification.heading}</h3>
			<div class="font-xs">{notification.description}</div>
		</div>
	</div>
	<div class="flex-none">
		<button class="btn-ghost btn-square btn-sm btn" on:click={handleButtonClick}>
			<i class="fa-solid fa-times" />
		</button>
	</div>
</div>
