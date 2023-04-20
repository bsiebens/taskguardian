<script lang="ts">
	import { IconMessage, IconPlayerPlay, IconAlertCircle, IconAlertTriangle, IconCheckbox, IconTrash, IconTrashOff, IconCheck, IconArrowBackUp, IconReload, IconDisc } from '@tabler/icons-svelte';
	import moment from 'moment';
	import type { Task } from 'taskwarrior-lib';
	import { convertTaskwarriorDateToISO8601Format } from './dateutils';

	export let task: Task;

	function taskDueStatus() {
		if (task.status === 'completed' || task.status === 'deleted') return null;

		let dueDate = new Date(convertTaskwarriorDateToISO8601Format(task.due));
		if (dueDate < new Date()) return 'overdue';
		//@ts-ignore
		if (dueDate - new Date() <= 24 * 60 * 60 * 1000) return 'neardue';

		return null;
	}

	$: dueStatus = taskDueStatus();
	$: recurring = true;
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
			{:else if dueStatus === 'overdue'}
				<div class="badge badge-error">
					<IconAlertCircle class="w-4 h-4 mr-1" />overdue
				</div>
			{:else if dueStatus === 'neardue'}
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
						<input type="checkbox" name="recurrence" class="toggle" checked={task.recur === undefined || task.recur === '' ? false : true} />
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
				<a href="" class="btn btn-sm btn-primary gap-2"><IconDisc class="w-4 h-4" />Save</a>
				<a href="" class="btn btn-sm btn-success gap-2"><IconCheck class="w-4 h-4" />Complete</a>
				<a href="" class="btn btn-sm btn-error gap-2"><IconTrash class="w-4 h-4" />Delete</a>
			{/if}
		</div>
	</div>
</div>

<!-- <div class={rowClass()}>
		<div class="col-span-6">
			<div class="flex flex-row gap-2 items-center">
				{#if taskOverDue()}
					<IconAlertCircle />
				{:else if taskAlmostOverDue()}
					<IconAlertTriangle />
				{/if}

				{#if task.status === 'completed'}
					<IconCheckbox class="text-success" />
				{:else if task.status === 'deleted'}
					<IconTrash class="text-error" />
				{/if}

				{#if task.status === 'pending'}
					{#if (task.tags && task.tags.length > 0) || task.scheduled || (task.annotations && task.annotations.length > 0)}
						<div class="flex flex-col gap-1 grow">
							<div class="font-semibold">{task.description}</div>

							<div class="flex flex-row gap-1">
								{#if task.tags && task.tags.length > 0}
									{#each task.tags as tag}
										<div class="badge badge-primary">{tag}</div>
									{/each}
								{/if}

								{#if task.scheduled}
									<div class="badge badge-secondary gap-1">
										<IconPlayerPlay class="w-4 h-4" />
										{moment(convertTaskwarriorDateToISO8601Format(task.scheduled)).fromNow()}
									</div>
								{/if}

								{#if task.annotations && task.annotations.length > 0}
									<div class="badge badge-accent gap-1">
										<IconMessage class="w-4 h-4" />
										notes
									</div>
								{/if}
							</div>
						</div>
					{:else}
						<div class="font-semibold">{task.description}</div>
					{/if}
				{:else}
					<div class="font-semibold grow">{task.description}</div>
				{/if}
			</div>
		</div>

		<div>
			{#if task.due}
				{moment(convertTaskwarriorDateToISO8601Format(task.due)).fromNow()}
			{/if}
		</div>

		<div class="col-span-2">
			{#if task.project}
				<div class="breadcrumbs py-0">
					<ul>
						{#each task.project.split('.') as project}
							<li>{project}</li>
						{/each}
					</ul>
				</div>
			{/if}
		</div>

		<div class="mx-auto">
			{#if task.priority === 'L'}
				<div class="badge badge-success">low</div>
			{:else if task.priority === 'M'}
				<div class="badge badge-warning">medium</div>
			{:else if task.priority === 'H'}
				<div class="badge badge-error">high</div>
			{:else}
				<div class="badge badge-info">none</div>
			{/if}
		</div>

		<div>
			{task.urgency}
		</div>

		<div>
			{#if task.status === 'completed'}
				<a href=""><IconEye class="w-4 h-4 mr-2" />View</a>
				<a href=""><IconEye class="w-4 h-4 mr-2" />Restore</a>
				<a href=""><IconEye class="w-4 h-4 mr-2" />Delete</a>
			{:else if task.status === 'deleted'}
				<a href=""><IconEye class="w-4 h-4 mr-2" />View</a>
				<a href=""><IconEye class="w-4 h-4 mr-2" />Restore</a>
			{:else}
				<a href=""><IconEye class="w-4 h-4 mr-2" />View</a>
				<a href=""><IconEye class="w-4 h-4 mr-2" />Complete</a>
				<a href=""><IconEye class="w-4 h-4 mr-2" />Delete</a>
			{/if}
		</div>
	</div>
 -->
