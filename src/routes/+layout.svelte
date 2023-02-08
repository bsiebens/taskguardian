<script>
	import { onMount } from 'svelte';
	import { themeChange } from 'theme-change';
	import Notifications from 'svelte-notifications';
	import Alert from '../lib/Alert.svelte';
	import TabButton from '../lib/TabButton.svelte';
	import '../app.css';

	onMount(() => {
		themeChange(false);
	});
</script>

<div class="navbar bg-neutral text-neutral-content">
	<div class="flex-1">
		<div class="lg:ml-16 ml-2 text-2xl font-semibold normal-case">
			<i class="fa-solid fa-shield-dog" />
			TaskGuardian
		</div>
	</div>
	<div class="lg:mr-32 mr-2 flex-none gap-4">
		<label class="swap-rotate swap">
			<input data-toggle-theme="halloween,emerald" data-act-class="active" type="checkbox" id="darkMode" />
			<i class="fa-solid fa-sun swap-off h-6 w-6 fill-current" />
			<i class="fa-solid fa-moon swap-on h-6 w-6 fill-current" />
		</label>
	</div>
</div>

<Notifications item={Alert}>
	<div class="container mx-auto my-16 px-2 lg:px-0">
		<div class='prose mb-4'>
			<h1>Tasks</h1>
		</div>
	
		<div class='flex flex-col lg:flex-row items-center'>
			<div class='flex-auto mb-4 lg:mb-0'>
				<!-- <div class='flex flex-col gap-y-1 lg:flex-row lg:gap-x-2'>
					<button class='btn'>Button 1</button>
					<button class='btn'>Button 2</button>
					<button class='btn'>Button 3</button>
					<button class='btn'>Button 4</button>
				</div> -->
				<div class='tabs tabs-boxed justify-center lg:justify-start'>
					<TabButton tabName={'next'} />
					<TabButton tabName={'later'} />
					<TabButton tabName={'recurring'} />
					<TabButton tabName={'completed'} />
					<TabButton tabName={'deleted'} />

					<!-- <a class='tab tab-active'>
						<i class='fa-solid fa-play mr-2' />
						<span class='uppercase'>next</span>
					</a>
					<a class='tab'>
						<i class='fa-solid fa-clock mr-2' />
						<span class='uppercase'>later</span>
					</a>
					<a class='tab'>
						<i class='fa-solid fa-repeat mr-2' />
						<span class='uppercase'>recurring</span>
					</a>
					<a class='tab'>
						<i class='fa-solid fa-square-check mr-2' />
						<span class='uppercase'>completed</span>
					</a>
					<a class='tab'>
						<i class='fa-solid fa-trash mr-2' />
						<span class='uppercase'>deleted</span>
					</a> -->
				</div>
			</div>
		
			<div class='flex mb-4 mx-auto lg:mb-0 lg:mx-0 lg:ml-4 gap-x-2'>
				<button class='btn btn-secondary'>
					<i class='fa-solid fa-refresh mr-2' />sync
				</button>
				<button class='btn btn-primary'>
					<i class='fa-solid fa-plus mr-2' />add
				</button>
			</div>
		</div>

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
