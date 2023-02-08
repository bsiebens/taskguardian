<script>
	import FormModal from '$lib/FormModal.svelte';
	import { onMount } from 'svelte';
	import Notifications from 'svelte-notifications';
	import { themeChange } from 'theme-change';
	import '../app.css';
	import Alert from '../lib/Alert.svelte';
	import SyncButton from '../lib/SyncButton.svelte';
	import TabButton from '../lib/TabButton.svelte';
	import { IconSun, IconMoon, IconPlus } from '@tabler/icons-svelte';

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
			<IconSun class='swap-off h-6 w-6 fill-current' />
			<IconMoon class='swap-on h-6 w-6 fill-current' />
		</label>
	</div>
</div>

<Notifications item={Alert}>
	<div class="container mx-auto my-16 px-2 lg:px-0">
		<div class="prose mb-4">
			<h1>Tasks</h1>
		</div>

		<div class="flex flex-col items-center lg:flex-row">
			<div class="mb-4 flex-auto lg:mb-0">
				<div class="tabs justify-center lg:justify-start">
					<TabButton tabName={'next'} />
					<TabButton tabName={'later'} />
					<TabButton tabName={'recurring'} />
					<TabButton tabName={'completed'} />
					<TabButton tabName={'deleted'} />
				</div>
			</div>

			<div class="mx-auto mb-4 flex lg:mx-0 lg:mb-0 lg:ml-4">
				<div class="flex flex-row gap-x-2">
					<SyncButton />
					<button class="btn-primary btn w-28">
						<IconPlus class='mx-1' />add
					</button>
				</div>
			</div>
		</div>

		<div class="prose max-w-none">
			<slot />
		</div>
	</div>

	<FormModal id="add" />
</Notifications>

<footer class="footer footer-center bg-base-300 p-4 text-base-content">
	<div>
		<p>
			created by bernard siebens <a href="https://github.com/bsiebens/taskguardian" class="hover:text-secondary">
				<i class="fa-brands fa-github ml-2" />
			</a>
		</p>
	</div>
</footer>
