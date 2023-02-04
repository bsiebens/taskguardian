<script>
    import { convertTaskwarriorDateToISO8601Format } from "./utilities";
    import moment from 'moment';

    export let item;

    $: tags = (item.tags === undefined) ? []: item.tags;
    $: annotations = (item.annotations === undefined) ? [] : item.annotations;
</script>

<div class='space-y-2 max-w-xl whitespace-normal'>
    <div class='text-sm'>{item.description}</div>

    <div>
        {#each annotations as annotation}
            <div class='flex flex-row gap-x-4 ml-4 text-xs'>
                <div class='min-w-fit font-semibold'>{moment(convertTaskwarriorDateToISO8601Format(annotation.entry)).fromNow()}</div>
                <div class='text-justify'>{annotation.description}</div>
            </div>
        {/each}
    </div>

    <div class='flex flex-row gap-x-1'>
        {#each tags as tag}
            {#if tag == 'next'}
                <span class='chip variant-soft-error'>
                    <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-tag w-4 h-4 mr-1" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                        <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                        <circle cx="8.5" cy="8.5" r="1" fill="currentColor" />
                        <path d="M4 7v3.859c0 .537 .213 1.052 .593 1.432l8.116 8.116a2.025 2.025 0 0 0 2.864 0l4.834 -4.834a2.025 2.025 0 0 0 0 -2.864l-8.117 -8.116a2.025 2.025 0 0 0 -1.431 -.593h-3.859a3 3 0 0 0 -3 3z" />
                    </svg>
                    {tag}
                </span>
            {:else}
                <span class='chip variant-soft-primary'>
                    <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-tag w-4 h-4 mr-1" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                        <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                        <circle cx="8.5" cy="8.5" r="1" fill="currentColor" />
                        <path d="M4 7v3.859c0 .537 .213 1.052 .593 1.432l8.116 8.116a2.025 2.025 0 0 0 2.864 0l4.834 -4.834a2.025 2.025 0 0 0 0 -2.864l-8.117 -8.116a2.025 2.025 0 0 0 -1.431 -.593h-3.859a3 3 0 0 0 -3 3z" />
                    </svg>
                    {tag}
                </span>
            {/if}
        {/each}

        {#if item.status == 'pending' }
            {#if item.scheduled != undefined }
                <span class='chip variant-soft-secondary'>
                    <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-player-play w-4 h-4 mr-1" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                        <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                        <path d="M7 4v16l13 -8z" />
                    </svg>
                    {moment(convertTaskwarriorDateToISO8601Format(item.scheduled)).fromNow()}
                </span>
            {/if}
        {/if}
    </div>
</div>