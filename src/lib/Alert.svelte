<script>
	import { error } from "@sveltejs/kit";


    export let notification = {}
    export let onRemove = null

    const handleButtonClick = () => {
        onRemove()
    }

    let successClass = 'alert alert-success shadow-lg my-8'
    let warningClass = 'alert alert-warning shadow-lg my-8'
    let errorClass = 'alert alert-error shadow-lg my-8'
    let alertClass = successClass

    $: if (notification.type === 'error') alertClass = errorClass
    $: if (notification.type === 'warning') alertClass = warningClass
</script>

<div class={ alertClass } style='width: 500px; margin-left: -50px;'>
    <div>
        {#if notification.type === 'success'}
            <i class="fa-solid fa-circle-check w-8 h-8 mr-2" />
        {:else if notification.type === 'warning'}
            <i class='fa-solid fa-triangle-exclamation w-8 h-8 mr-2' />
        {:else}
            <i class='fa-solid fa-circle-exclamation w-8 h-8 mr-2' />
        {/if}
        <div>
            <h3 class='font-bold'>{ notification.heading }</h3>
            <div class='font-xs'>{ notification.description }</div>
        </div>
    </div>
    <div class='flex-none'>
        <button class='btn btn-sm btn-square' on:click={ handleButtonClick }>
            <i class='fa-solid fa-times' />
        </button>
    </div>
</div>