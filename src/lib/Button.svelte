<script>
    import { IconPlayerPlay, IconClockHour2, IconRepeat, IconCheckbox, IconTrash } from '@tabler/icons-svelte';

    export let name = 'next';
    export let filter = 'next';

    const activeBtnClass = 'btn hover:ring-2 hover:ring-primary-500 hover:ring-inset variant-filled-surface';
    const inActiveBtnClass = 'btn hover:ring-2 hover:ring-primary-500 hover:ring-inset variant-ghost-surface';
    let btnClass = inActiveBtnClass;

    $: (name == filter) ? btnClass = activeBtnClass : btnClass = inActiveBtnClass;
</script>

<button on:click={() => filter = name} class={btnClass}>
    {#if (name == 'next')}
        <IconPlayerPlay />
    {:else if (name == 'later')}
        <IconClockHour2 />
    {:else if (name == 'recurring')}
        <IconRepeat />
    {:else if (name == 'completed')}
        <IconCheckbox />
    {:else if (name == 'deleted')}
        <IconTrash />
    {/if}
    <span class='uppercase'>{name}</span>
</button>