<script>
    import { enhance } from '$app/forms'
    import { invalidateAll } from '$app/navigation'
    import { getNotificationsContext } from 'svelte-notifications'

    const { addNotification } = getNotificationsContext()

    export let data
</script>

<h1>Tasks</h1>

<form method='post' action='?/sync' use:enhance={({ form, data, action, cancel }) => {
    return async ({ result, update }) => {
        addNotification({
            description: result.data.message,
            type: result.data.type,
            heading: 'Sync status',
            position: 'bottom-center',
            removeAfter: 10 * 1000
        })
        await invalidateAll();
    }
}}>
    <button class='btn' type='submit'>sync</button>
</form>

<ul>
    {#each data.tasks.next as task}
        <li>{ task.description }</li>
    {/each}
</ul>
