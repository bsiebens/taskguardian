<script lang="ts">
	import { IconAlertCircle, IconAlertTriangle, IconArrowBackUp, IconCheck, IconCheckbox, IconDeviceFloppy, IconReload, IconTrash, IconTrashOff } from '@tabler/icons-svelte';
	import type { Task } from 'taskwarrior-lib';
	import { convertTaskwarriorDateToISO8601Format, taskDueStatus } from './dateutils';

	export let task: Task;
	let recurring = (task.recur === undefined || task.recur === '') ? false : true;
</script>

<div class="card bg-base-100 shadow-xl">
	<div class="card-body">
		<h2 class="card-title">
			{#if task.status === 'pending' || task.status === 'recurring'}
				{#if task.priority === 'L'}
					<div class="badge badge-success">low</div>
				{:else if task.priority === 'M'}
					<div class="badge badge-warning">medium</div>
				{:else if task.priority === 'H'}
					<div class="badge badge-error">high</div>
				{:else}
					<div class="badge badge-info">none</div>
				{/if}
			{/if}

			{task.description}

			{#if task.status === 'completed'}
				<div class="badge badge-success">
					<IconCheckbox class="w-4 h-4 mr-1" />completed
				</div>
			{:else if task.status === 'deleted'}
				<div class="badge badge-error">
					<IconTrash class="w-4 h-4 mr-1" />deleted
				</div>
			{:else if task.status === 'recurring'}
				<div class="badge badge-info">
					<IconReload class="w-4 h-4 mr-1" />recurring
				</div>
			{:else if taskDueStatus(task) === 'overdue'}
				<div class="badge badge-error">
					<IconAlertCircle class="w-4 h-4 mr-1" />overdue
				</div>
			{:else if taskDueStatus(task) === 'neardue'}
				<div class="badge badge-warning">
					<IconAlertTriangle class="w-4 h-4 mr-1" />near due
				</div>
			{/if}
		</h2>

		<form class="border-t-2 border-accent mt-4 pt-2">
			<input type="hidden" name="id" value={task.uuid} />

			<div class="form-control w-full">
				<label for="description" class="label font-semibold">
					<span class="label-text">Description</span>
				</label>
				<input id="description" name="description" type="text" class="input input-bordered w-full" value={task.description} />
			</div>

			<div class="form-control w-full">
				<label for="project" class="label font-semibold">
					<span class="label-text">Project</span>
				</label>
				<input id="project" name="project" type="text" class="input-bordered input w-full" value={task.project === undefined ? '' : task.project} />
			</div>

			<div class="form-control w-full">
				<label for="tags" class="label font-semibold">
					<span class="label-text">Tags</span>
				</label>
				<input id="tags" name="tags" type="text" class="input-bordered input w-full" value={task.tags === undefined ? '' : task.tags.join(' ')} />
			</div>

			<div class="grid grid-cols-2 gap-2">
				<div class="form-control w-full">
					<label for="due" class="label font-semibold">
						<span class="label-text">Due</span>
					</label>
					<input id="due" name="due" type="text" class="input-bordered input w-full" value={task.due === undefined ? '' : task.due} />
				</div>

				<div class="form-control w-full">
					<label for="until" class="label font-semibold">
						<span class="label-text">Until</span>
					</label>
					<input id="until" name="until" type="text" class="input-bordered input w-full" value={task.until === undefined ? '' : task.until} />
				</div>

				<div class="form-control w-full">
					<label for="scheduled" class="label font-semibold">
						<span class="label-text">Scheduled</span>
					</label>
					<input id="scheduled" name="scheduled" type="text" class="input-bordered input w-full" value={task.scheduled === undefined ? '' : task.scheduled} />
				</div>

				<div class="form-control w-full">
					<label for="wait" class="label font-semibold">
						<span class="label-text">Wait</span>
					</label>
					<input id="wait" name="wait" type="text" class="input-bordered input w-full" value={task.wait === undefined ? '' : task.wait} />
				</div>
			</div>

			<h4 class="label-text pt-4 font-semibold">Recurrence</h4>
			<div class="grid grid-cols-8 items-center gap-2 pb-4">
				<div class="form-control w-full">
					<label for="recurrence" class="label cursor-pointer justify-start">
						<input type="checkbox" name="recurrence" class="toggle" bind:checked={recurring} />
					</label>
				</div>

				<div class="form-control col-span-7 w-full">
					{#if recurring}
						<input id="period" name="period" type="text" placeholder="Recurrence Period" class="input-bordered input w-full" value={task.recur === undefined ? '' : task.recur} />
					{:else}
						<input disabled id="period" name="period" type="text" placeholder="Recurrence Period" class="input-bordered input w-full" value={task.recur === undefined ? '' : task.recur} />
					{/if}
				</div>
			</div>

			<div>
				<h4 class="label-text font-semibold">Priority</h4>
				<div class="flex flex-row">
					<div class="form-control w-full">
						<label for="none" class="label cursor-pointer justify-start">
							<input type="radio" name="priority" class="radio" value="" checked={task.priority === undefined ? true : false} />
							<span class="label-text ml-2">No priority</span>
						</label>
					</div>

					<div class="form-control w-full">
						<label for="low" class="label cursor-pointer justify-start">
							<input type="radio" name="priority" class="radio" value="L" checked={task.priority === 'L' ? true : false} />
							<span class="label-text ml-2">Low</span>
						</label>
					</div>

					<div class="form-control w-full">
						<label for="medium" class="label cursor-pointer justify-start">
							<input type="radio" name="priority" class="radio" value="M" checked={task.priority === 'M' ? true : false} />
							<span class="label-text ml-2">Medium</span>
						</label>
					</div>

					<div class="form-control w-full">
						<label for="high" class="label cursor-pointer justify-start">
							<input type="radio" name="priority" class="radio" value="H" checked={task.priority === 'H' ? true : false} />
							<span class="label-text ml-2">High</span>
						</label>
					</div>
				</div>
			</div>
		</form>

		<div class="card-actions justify-end mt-4">
			{#if task.status === 'completed'}
				<a href="" class="btn btn-sm btn-info gap-2"><IconArrowBackUp class="w-4 h-4" />Restore</a>
				<a href="" class="btn btn-sm btn-error gap-2"><IconTrash class="w-4 h-4" />Delete</a>
			{:else if task.status === 'deleted'}
				<a href="" class="btn btn-sm btn-info gap-2"><IconTrashOff class="w-4 h-4" />Restore</a>
			{:else}
				<a href="" class="btn btn-sm btn-primary gap-2"><IconDeviceFloppy class="w-4 h-4" />Save</a>O
				<a href="" class="btn btn-sm btn-success gap-2"><IconCheck class="w-4 h-4" />Complete</a>
				<a href="" class="btn btn-sm btn-error gap-2"><IconTrash class="w-4 h-4" />Delete</a>
			{/if}
		</div>
	</div>
</div>