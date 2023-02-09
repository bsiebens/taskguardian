<script>
	/**
	 * @type {string}
	 */
	export let id;
</script>

<input type="checkbox" {id} class="modal-toggle" />

<div class="modal modal-bottom sm:modal-middle">
	<div class="modal-box sm:w-10/12 sm:max-w-5xl">
		<h3 class="mb-1 text-lg font-bold">
			{#if id === 'add'}
				Add new task
			{:else}
				Edit task
			{/if}
		</h3>

		<form class="space-y-2" method="post" action="?/add">
			<div class="form-control w-full">
				<label for="description" class="label font-semibold">
					<span class="label-text">Description</span>
				</label>
				<input id="description" type="text" class="input-bordered input w-full" />
			</div>

			<div class="form-control w-full">
				<label for="project" class="label font-semibold">
					<span class="label-text">Project</span>
				</label>
				<input id="project" type="text" class="input-bordered input w-full" />
			</div>

			<div class="form-control w-full">
				<label for="tags" class="label font-semibold">
					<span class="label-text">Tags</span>
				</label>
				<input id="tags" type="text" class="input-bordered input w-full" />
			</div>

			<div class="grid grid-cols-2 gap-2">
				<div class="form-control w-full">
					<label for="due" class="label font-semibold">
						<span class="label-text">Due</span>
					</label>
					<input id="due" type="text" class="input-bordered input w-full" />
				</div>

				<div class="form-control w-full">
					<label for="until" class="label font-semibold">
						<span class="label-text">Until</span>
					</label>
					<input id="until" type="text" class="input-bordered input w-full" />
				</div>

				<div class="form-control w-full">
					<label for="scheduled" class="label font-semibold">
						<span class="label-text">Scheduled</span>
					</label>
					<input id="scheduled" type="text" class="input-bordered input w-full" />
				</div>

				<div class="form-control w-full">
					<label for="wait" class="label font-semibold">
						<span class="label-text">Wait</span>
					</label>
					<input id="wait" type="text" class="input-bordered input w-full" />
				</div>
			</div>

			<h4 class="label-text pt-4 font-semibold">Recurrence</h4>
			<div class="grid grid-cols-3 items-center gap-2 pb-4">
				<div class="form-control w-full">
					<label for="recurrence" class="label cursor-pointer justify-start">
						<input type="checkbox" class="toggle" />
						<span class="label-text ml-2 text-left">Recurring?</span>
					</label>
				</div>

				<div class="form-control col-span-2 w-full">
					<input id="period" type="text" placeholder="Period" class="input-bordered input w-full" />
				</div>
			</div>

			<div>
				<h4 class="label-text font-semibold">Priority</h4>
				<div class="flex flex-row">
					<div class="form-control w-full">
						<label for="none" class="label cursor-pointer justify-start">
							<input type="radio" name="priority" class="radio" />
							<span class="label-text ml-2">No priority</span>
						</label>
					</div>

					<div class="form-control w-full">
						<label for="low" class="label cursor-pointer justify-start">
							<input type="radio" name="priority" class="radio" />
							<span class="label-text ml-2">Low</span>
						</label>
					</div>

					<div class="form-control w-full">
						<label for="medium" class="label cursor-pointer justify-start">
							<input type="radio" name="priority" class="radio" />
							<span class="label-text ml-2">Medium</span>
						</label>
					</div>

					<div class="form-control w-full">
						<label for="high" class="label cursor-pointer justify-start">
							<input type="radio" name="priority" class="radio" />
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
