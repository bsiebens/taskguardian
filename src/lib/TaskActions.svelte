<script>
    import { IconPencil, IconCheck, IconTrash } from '@tabler/icons-svelte';

    export let item;
</script>

<div class='flex flex-row gap-x-2'>
    <IconPencil />
    <IconCheck />
    <IconTrash />
</div>