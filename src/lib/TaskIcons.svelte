<script>
	import { convertTaskwarriorDateToISO8601Format } from "./utilities";
    import { IconCheckbox, IconTrash, IconAlertCircle, IconAlertTriangle, IconLock } from '@tabler/icons-svelte';
    import { activeTab } from './stores';

    export let task;
    export let pendingTasks;

    function isTaskOverDue(task) {
        if (task.status === 'completed') return false;
        if (task.status === 'deleted') return false;
        return new Date(convertTaskwarriorDateToISO8601Format(task.due)) < new Date();
    }

    function isTaskDueInNext24Hours(task) {
        if (task.status === 'completed') return false;
        if (task.status === 'deleted') return false;
        return new Date(convertTaskwarriorDateToISO8601Format(task.due)) - new Date() <= 24 * 60 * 60 * 1000;
    }

    function isTaskBlocked(task, pendingTasks) {
        if (task.depends === undefined) return false;

        let blocked = false;
        task.depends.forEach(dependency => {
            if (pendingTasks.includes(dependency)) {
                blocked = true;
            }
        });

        return blocked;
    }
</script>

{#if $activeTab != 'recurring'}
    <div class='flex flex-row'>
        {#if task.status === 'completed' || task.status === 'deleted'}
            {#if task.status === 'completed'}
                <IconCheckbox class='text-success' />
            {:else}
                <IconTrash class='text-error' />
            {/if}
        {:else}
            {#if isTaskOverDue(task)}
                <IconAlertCircle />
            {:else if isTaskDueInNext24Hours(task)}
                <IconAlertTriangle />
            {/if}

            {#if isTaskBlocked(task, pendingTasks)}
                <IconLock />
            {/if}
        {/if}
    </div>
{/if}