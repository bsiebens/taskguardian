<script>
    import { IconPencil, IconCheck, IconTrash, IconArrowBackUp, IconTrashOff } from "@tabler/icons-svelte";
    import { TaskwarriorLib } from "taskwarrior-lib";

    export let item;
    const taskwarrior = new TaskwarriorLib();

    function markCompleted(item) {
        item.status = "completed";
        console.log(taskwarrior.update([item]));
    }

    function markNotCompleted(item) {}

    function markDeleted(item) {}
</script>

<div class="flex flex-row gap-x-2">
    {#if item.status == "completed"}
        <IconArrowBackUp />
        <IconTrash />
    {:else if item.status == "deleted"}
        <IconTrashOff />
    {:else}
        <IconPencil />
        <button on:click={() => markCompleted(item)}><IconCheck /></button>
        <IconTrash />
    {/if}
</div>
