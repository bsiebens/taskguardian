<script>
    import { IconPencil, IconCheck, IconTrash, IconArrowBackUp, IconTrashOff } from "@tabler/icons-svelte";

    export let item;
</script>

<div class="flex flex-row gap-x-2">
    {#if item.status == "completed"}
        <IconArrowBackUp />
        <IconTrash />
    {:else if item.status == "deleted"}
        <IconTrashOff />
    {:else}
        <IconPencil />
        <IconCheck />
        <IconTrash />
    {/if}
</div>
