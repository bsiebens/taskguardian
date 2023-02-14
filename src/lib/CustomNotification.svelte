<script lang="ts">
	import { IconAlertOctagon, IconAlertTriangle, IconCheckbox, IconX } from '@tabler/icons-svelte';
	import type { ComponentType } from 'svelte';

	interface Notification {
		type: string;
		heading: string;
		description: string;
	}

	export let notification: Notification;
	export let onRemove: any;

	const handleCloseButtonClick = () => {
		onRemove();
	};

	const notificationToIcon: { [notificationType: string]: ComponentType } = {
		success: IconCheckbox,
		warning: IconAlertTriangle,
		error: IconAlertOctagon
	};

	const notificationToClass: { [notificationType: string]: string } = {
		success: 'alert alert-success shadow-lg my-8',
		warning: 'alert alert-warning shadow-lg my-8',
		error: 'alert alert-error shadow-lg my-8'
	};

	$: notificationClass = notificationToClass[notification.type];
	$: notificationIcon = notificationToIcon[notification.type];
</script>

<div class={notificationClass} style="width: 500px; margin-left: -50px;">
	<div>
		<svelte:component this={notificationIcon} class="mr-2 h-8 w-8" />

		{#if notification.heading != undefined}
			<div>
				<h3 class="font-bold">{notification.heading}</h3>
				<div class="font-xs">{notification.description}</div>
			</div>
		{:else}
			<div>{notification.description}</div>
		{/if}
	</div>

	<div class="flex-none">
		<button class="btn-ghost btn-square btn-sm btn" on:click={handleCloseButtonClick}>
			<IconX />
		</button>
	</div>
</div>
