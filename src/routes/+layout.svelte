<script>
	import '@skeletonlabs/skeleton/themes/theme-skeleton.css';
	import '@skeletonlabs/skeleton/styles/all.css';
	import '../app.postcss';

	import { AppShell, AppBar } from '@skeletonlabs/skeleton';
	import { LightSwitch } from '@skeletonlabs/skeleton';
	import { IconShieldCheckered } from '@tabler/icons-svelte';
</script>

<AppShell>
	<svelte:fragment slot='header'>
		<AppBar>
			<svelte:fragment slot='lead'>
				<IconShieldCheckered class='mr-2' />
				<strong class='text-xl uppercase'>TaskGuardian</strong>
			</svelte:fragment>
			<svelte:fragment slot='trail'>
				<LightSwitch />
			</svelte:fragment>
		</AppBar>
	</svelte:fragment>

	<slot />
</AppShell>