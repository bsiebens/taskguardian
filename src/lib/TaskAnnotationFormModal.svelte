<script lang='ts'>
	import { getNotificationsContext } from 'svelte-notifications';
	import { enhance } from '$app/forms';
	import { invalidateAll } from '$app/navigation';

    import type { Task } from 'taskwarrior-lib';

	export let task: Task | undefined
	export let isModalOpen = false;

	const { addNotification } = getNotificationsContext();
</script>

{#if task != undefined}
    <input type="checkbox" id={task.uuid} class="modal-toggle" bind:checked={isModalOpen} />

    <div class="modal modal-bottom sm:modal-middle">
        <div class="modal-box sm:w-10/12 sm:max-w-5xl">
            <h3 class="mb-1 text-lg font-bold">Add new annotation</h3>

            <form
                class="space-y-2"
                method="post"
                action="?/annotate"
                use:enhance={({ form, data, action, cancel }) => {
                    return async ({ result, update }) => {
                        addNotification({
                            // @ts-ignore
                            description: result.data.message,
                            // @ts-ignore
                            type: result.data.type,
                            heading: result.data.heading,
                            position: 'bottom-center',
                            removeAfter: 10 * 1000
                        });
                        isModalOpen = false;
                        await invalidateAll();
                    };
                }}
            >
                <input type="hidden" name="id" value={task.uuid} />

                <div class="form-control w-full">
                    <label for="annotation" class="label font-semibold">
                        <span class="label-text">Annotation</span>
                    </label>
                    <input id="annotation" name="annotation" type="text" class="input-bordered input w-full" />
                </div>

                <div class="modal-action">
                    <label for={task.uuid} class="btn-ghost btn">Cancel</label>
                    <button type="submit" class="btn-primary btn">Save</button>
                </div>
            </form>
        </div>
    </div>
{/if}