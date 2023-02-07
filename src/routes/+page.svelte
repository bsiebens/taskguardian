<script>
    export let data
    export let form
</script>

<h1>Tasks</h1>

<form method='post' action='?/sync'>
    <button class='btn' type='submit'>sync</button>
</form>

{#if form?.type}
    {form.type} // {form.message}
{/if}

<ul>
    {#each data.tasks.next as task}
        <li>{ task.description }</li>
    {/each}
</ul>
