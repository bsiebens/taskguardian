<script>
	import { convertTaskwarriorDateToISO8601Format } from './utilities';
	import moment from 'moment';
	import { IconTag, IconPlayerPlay } from '@tabler/icons-svelte';

	/**
	 * @type {import('taskwarrior-lib').Task}
	 */
	export let task;

	$: tags = task.tags === undefined ? [] : task.tags;
	$: annotations = task.annotations === undefined ? [] : task.annotations;
</script>

<div class="max-w-xl space-y-1 whitespace-normal">
	<div>
		{task.description}
	</div>

	{#if annotations.length > 0}
		<div>
			{#each annotations as annotation}
				<div class="ml-4 flex flex-row gap-x-4 text-sm">
					<div class="min-w-fit font-semibold">{moment(convertTaskwarriorDateToISO8601Format(annotation.entry)).fromNow()}</div>
					<div class="text-justify">{annotation.description}</div>
				</div>
			{/each}
		</div>
	{/if}

	{#if tags.length > 0 || (task.status == 'pending' && task.scheduled != undefined)}
		<div class="flex flex-row gap-x-1">
			{#each tags as tag}
				<div class="badge-secondary badge gap-2 text-secondary-content">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						class="icon icon-tabler icon-tabler-tag h-4 w-4"
						width="40"
						height="40"
						viewBox="0 0 24 24"
						stroke-width="2"
						stroke="currentColor"
						fill="none"
						stroke-linecap="round"
						stroke-linejoin="round"
					>
						<path stroke="none" d="M0 0h24v24H0z" fill="none" />
						<circle cx="8.5" cy="8.5" r="1" fill="currentColor" />
						<path
							d="M4 7v3.859c0 .537 .213 1.052 .593 1.432l8.116 8.116a2.025 2.025 0 0 0 2.864 0l4.834 -4.834a2.025 2.025 0 0 0 0 -2.864l-8.117 -8.116a2.025 2.025 0 0 0 -1.431 -.593h-3.859a3 3 0 0 0 -3 3z"
						/>
					</svg>
					{tag}
				</div>
			{/each}

			{#if task.status == 'pending' && task.scheduled != undefined}
				<div class="badge-accent badge gap-2 text-accent-content">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						class="icon icon-tabler icon-tabler-player-play h-4 w-4"
						width="40"
						height="40"
						viewBox="0 0 24 24"
						stroke-width="2"
						stroke="currentColor"
						fill="none"
						stroke-linecap="round"
						stroke-linejoin="round"
					>
						<path stroke="none" d="M0 0h24v24H0z" fill="none" />
						<path d="M7 4v16l13 -8z" />
					</svg>
					{moment(convertTaskwarriorDateToISO8601Format(task.scheduled)).fromNow()}
				</div>
			{/if}
		</div>
	{/if}
</div>
