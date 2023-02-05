<script>
    import { convertTaskwarriorDateToISO8601Format } from "./utilities";
    import { IconAlertCircle, IconAlertTriangle, IconLock, IconCheckbox, IconTrash } from '@tabler/icons-svelte';
    import { pendingTasks } from "./stores";

    export let item;
    
    function itemOverDue(item) {
        if (item.status == 'completed') return false;
        if (item.status == 'deleted' ) return false;

        return new Date(convertTaskwarriorDateToISO8601Format(item.due)) < new Date();
    }

    function itemDueNext24Hours(item) {
        if (item.status == 'completed' ) return false;
        if (item.status == 'deleted' ) return false;

        return new Date(convertTaskwarriorDateToISO8601Format(item.due)) - new Date() <= (24 * 60 * 60 * 1000) // 24h * 60m * 60s * 1000ms
    }

    function itemBlocked(item, pendingTasks) {
        if (item.depends === undefined) return 0;

        var countBlockers = 0;
        for (let index = 0; index < item.depends.length; index++) {
            const dependency = item.depends[index];
            
            if (pendingTasks.includes(dependency)) {
                countBlockers++;
            }
        }

        console.log(countBlockers);
        return countBlockers;
    }
</script>

<div class='flex flex-row'>
    {#if item.status == 'completed' || item.status == 'deleted'}
        {#if item.status == 'completed'}
            <IconCheckbox class='text-primary-500' />
        {:else}
            <IconTrash class='text-secondary-500' />
        {/if}
    {:else}
        {#if itemOverDue(item)}
            <IconAlertCircle class='text-error-500' />
        {:else if itemDueNext24Hours(item)}
            <IconAlertTriangle class='text-warning-500' />
        {/if}

        <!-- {#if itemBlocked(item, $pendingTasks)}
            <IconLock class='text-tertiary-500' />
        {/if} -->
    {/if}
</div>