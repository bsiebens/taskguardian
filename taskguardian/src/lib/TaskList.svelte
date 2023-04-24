<script lang="ts">
    import { IconList, IconChevronRight, IconAlertTriangle, IconAlertCircle, IconCheckbox, IconTrash, IconRepeat, IconPlayerPlay, IconPlayerPlayFilled } from "@tabler/icons-svelte";
    import type { Task } from "taskwarrior-lib";
    import moment from "moment";
    import { convertTaskwarriorDateToISO8601Format, taskDueStatus } from "./dateutils";

    export let tasks: Task[];
    export let listDisplay = "default";
    export let activeTask = "";

    function rowClass(task) {
        let baseRowClass = "hover";

        if (taskDueStatus(task) === "overdue") {
            if (task.uuid === activeTask) {
                return baseRowClass + " text-error [&>*]:bg-error";
            } else {
                return baseRowClass + " text-error-content [&>*]:bg-error hover:text-error";
            }
        } else if (taskDueStatus(task) === "neardue") {
            if (task.uuid === activeTask) {
                return baseRowClass + " text-warning [&>*]:bg-warning";
            } else {
                return baseRowClass + " text-warning-content [&>*]:bg-warning hover:text-warning";
            }
        } else {
            if (task.uuid === activeTask) {
                return baseRowClass + " active";
            } else {
                return baseRowClass;
            }
        }

        return baseRowClass;
    }
</script>


<table class="table table-compact w-full">
    <thead>
        <tr>
            <th></th>
            <th>ID</th>
            <th>Priority</th>
            <th>Description</th>
            <th>Project</th>
            <th>Due</th>
            <th>Urgency</th>
            <th></th>
        </tr>
    </thead>

    <tbody>
        {#each tasks as task}
            <tr class={rowClass(task)}>
                <td>
                    <div class="flex flex-row shrink gap-1">
                        {#if task.status === "completed"}
                            <IconCheckbox class="text-success" />
                        {:else if task.status === "deleted"}
                            <IconTrash class="text-error" />
                        {:else}
                            {#if task.status === "recurring"}
                                <IconRepeat class="text-info" />
                            {/if}

                            {#if taskDueStatus(task) === 'overdue'}
                                <IconAlertCircle />
                            {:else if taskDueStatus(task) === 'neardue'}
                                <IconAlertTriangle />
                            {/if}
                        {/if}
                    </div>
                </td>
                <td>{task.id}</td>
                <td>
                    {#if task.priority === 'L'}
                        <div class="badge badge-success">low</div>
                    {:else if task.priority === 'M'}
                        <div class="badge badge-warning">medium</div>
                    {:else if task.priority === 'H'}
                        <div class="badge badge-error">high</div>
                    {:else}
                        <div class="badge badge-info">none</div>
                    {/if}
                </td>
                <td>
                    {#if task.tags !== undefined || task.annotations !== undefined || task.wait !== undefined}
                        <div class="flex flex-col gap-y-2">
                            <div>{task.description}</div>
                            <div class="flex flex-row gap-1">
                                {#if task.tags !== undefined}
                                    {#each task.tags as tag}
                                        <div class="badge badge-sm badge-primary">{tag}</div>
                                    {/each}
                                {/if}

                                {#if task.annotations !== undefined}
                                    <div class="badge badge-sm badge-info">
                                        <IconList class="w-3 h-3 mr-1" />annotations
                                    </div>
                                {/if}

                                {#if task.wait !== undefined}
                                    <div class="badge badge-sm badge-secondary">
                                        <IconPlayerPlayFilled class="w-3 h-3 mr-1" /> {moment(convertTaskwarriorDateToISO8601Format(task.wait)).fromNow()}
                                    </div>
                                {/if}
                            </div>
                        </div>
                    {:else}
                        {task.description}
                    {/if}
                </td>
                <td>
                    {#if task.project !== undefined}
                        <div class="breadcrumbs">
                            <ul>
                                {#each task.project.split(".") as project}
                                    <li>{project}</li>
                                {/each}
                            </ul>
                        </div>
                    {/if}
                </td>
                <td>{moment(convertTaskwarriorDateToISO8601Format(task.due)).fromNow()}</td>
                <td>{task.urgency}</td>
                <td><IconChevronRight class="mx-auto" /></td>
            </tr>
        {/each}
    </tbody>
</table>
