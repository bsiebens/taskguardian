<script>
	import { onMount } from 'svelte';
	import { themeChange } from 'theme-change';
	import Notifications from 'svelte-notifications';
	import Alert from '../lib/Alert.svelte';

	import '../app.css';

	onMount(() => {
		themeChange(false);
	});
</script>

<div class="navbar bg-neutral text-neutral-content">
	<div class="flex-1">
		<div class="ml-16 text-2xl font-semibold normal-case">
			<i class="fa-solid fa-shield-dog" />
			TaskGuardian
		</div>
	</div>
	<div class="mr-32 flex-none gap-4">
		<label class="swap-rotate swap">
			<input data-toggle-theme="halloween,emerald" data-act-class="active" type="checkbox" id="darkMode" />
			<i class="fa-solid fa-sun swap-off h-6 w-6 fill-current" />
			<i class="fa-solid fa-moon swap-on h-6 w-6 fill-current" />
		</label>
	</div>
</div>

<Notifications item={Alert}>
	<div class="container mx-auto my-16">
		<div class="prose max-w-none">
			<slot />
		</div>
	</div>
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
