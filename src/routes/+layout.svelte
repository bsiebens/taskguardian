<script lang="ts">
	import { IconMoon, IconSun } from '@tabler/icons-svelte';
	import { onMount } from 'svelte';
	import { themeChange } from 'theme-change';
	import '../app.css';
	import TabButton from '../lib/TabButton.svelte';

	onMount(() => {
		themeChange(false);
	});
</script>

<div class="navbar bg-neutral text-neutral-content">
	<div class="flex-1">
		<div class="ml-2 text-2xl font-semibold normal-case lg:ml-16">
			<i class="fa-solid fa-shield-dog" />
			TaskGuardian
		</div>
	</div>

	<div class="mr-2 flex-none gap-4 lg:mr-32">
		<label class="swap-rotate swap">
			<input data-toggle-theme="halloween,emerald" data-act-class="active" type="checkbox" id="darkMode" />
			<IconSun class="swap-off h-6 w-6 fill-current" />
			<IconMoon class="swap-on h-6 w-6 fill-current" />
		</label>
	</div>
</div>

<div class="container mx-auto my-16 px-2 lg:px-0">
	<div class="prose mb-4">
		<h1>Tasks</h1>
	</div>

	<div class="flex flex-col items-center lg:flex-row">
		<div class="mb-4 flex-auto lg:mb-0">
			<div class="tabs justify-center lg:justify-start">
				<TabButton buttonName={'next'} />
				<TabButton buttonName={'later'} />
				<TabButton buttonName={'recurring'} />
				<TabButton buttonName={'completed'} />
				<TabButton buttonName={'deleted'} />
			</div>
		</div>
	</div>

	<slot />
</div>
