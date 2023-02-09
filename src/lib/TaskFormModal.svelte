<script>
	import { getNotificationsContext } from 'svelte-notifications';
	import { enhance } from '$app/forms';
	import { invalidateAll } from '$app/navigation';

	/**
	 * @type {string}
	 */
	export let id;
	let isModalOpen = false;

	const { addNotification } = getNotificationsContext();
</script>

<input type="checkbox" {id} class="modal-toggle" bind:checked={isModalOpen} />

<div class="modal modal-bottom sm:modal-middle">
	<div class="modal-box sm:w-10/12 sm:max-w-5xl">
		<h3 class="mb-1 text-lg font-bold">
			{#if id === 'add'}
				Add new task
			{:else}
				Edit task
			{/if}
		</h3>

		<form
			class="space-y-2"
			method="post"
			action="?/update"
			use:enhance={({ form, data, action, cancel }) => {
				return async ({ result, update }) => {
					addNotification({
						// @ts-ignore
						description: result.data.message,
						// @ts-ignore
						type: result.data.type,
						heading: 'Sync status',
						position: 'bottom-center',
						removeAfter: 10 * 1000
					});
					isModalOpen = false;
					await invalidateAll();
				};
			}}
		>
			{#if id === 'add'}
				<input type="hidden" name="id" value="" />
			{:else}{/if}
			<div class="form-control w-full">
				<label for="description" class="label font-semibold">
					<span class="label-text">Description</span>
				</label>
				<input id="description" name="description" type="text" class="input-bordered input w-full" />
			</div>

			<div class="form-control w-full">
				<label for="project" class="label font-semibold">
					<span class="label-text">Project</span>
				</label>
				<input id="project" name="project" type="text" class="input-bordered input w-full" />
			</div>

			<div class="form-control w-full">
				<label for="tags" class="label font-semibold">
					<span class="label-text">Tags</span>
				</label>
				<input id="tags" name="tags" type="text" class="input-bordered input w-full" />
			</div>

			<div class="grid grid-cols-2 gap-2">
				<div class="form-control w-full">
					<label for="due" class="label font-semibold">
						<span class="label-text">Due</span>
					</label>
					<input id="due" name="due" type="text" class="input-bordered input w-full" />
				</div>

				<div class="form-control w-full">
					<label for="until" class="label font-semibold">
						<span class="label-text">Until</span>
					</label>
					<input id="until" name="until" type="text" class="input-bordered input w-full" />
				</div>

				<div class="form-control w-full">
					<label for="scheduled" class="label font-semibold">
						<span class="label-text">Scheduled</span>
					</label>
					<input id="scheduled" name="scheduled" type="text" class="input-bordered input w-full" />
				</div>

				<div class="form-control w-full">
					<label for="wait" class="label font-semibold">
						<span class="label-text">Wait</span>
					</label>
					<input id="wait" name="wait" type="text" class="input-bordered input w-full" />
				</div>
			</div>

			<h4 class="label-text pt-4 font-semibold">Recurrence</h4>
			<div class="grid grid-cols-6 items-center gap-2 pb-4">
				<div class="form-control w-full">
					<label for="recurrence" class="label cursor-pointer justify-start">
						<input type="checkbox" name="recurrence" class="toggle" />
					</label>
				</div>

				<div class="form-control col-span-5 w-full">
					<input id="period" name="period" type="text" placeholder="Period" class="input-bordered input w-full" />
				</div>
			</div>

			<div>
				<h4 class="label-text font-semibold">Priority</h4>
				<div class="flex flex-row">
					<div class="form-control w-full">
						<label for="none" class="label cursor-pointer justify-start">
							<input type="radio" name="priority" class="radio" value="" checked />
							<span class="label-text ml-2">No priority</span>
						</label>
					</div>

					<div class="form-control w-full">
						<label for="low" class="label cursor-pointer justify-start">
							<input type="radio" name="priority" class="radio" value="L" />
							<span class="label-text ml-2">Low</span>
						</label>
					</div>

					<div class="form-control w-full">
						<label for="medium" class="label cursor-pointer justify-start">
							<input type="radio" name="priority" class="radio" value="M" />
							<span class="label-text ml-2">Medium</span>
						</label>
					</div>

					<div class="form-control w-full">
						<label for="high" class="label cursor-pointer justify-start">
							<input type="radio" name="priority" class="radio" value="H" />
							<span class="label-text ml-2">High</span>
						</label>
					</div>
				</div>
			</div>

			<div class="modal-action">
				<label for={id} class="btn-ghost btn">Cancel</label>
				<button type="submit" class="btn-primary btn">Save</button>
			</div>
		</form>
	</div>
</div>
