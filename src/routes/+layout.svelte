<script>
    import { onMount } from 'svelte'
    import { themeChange } from 'theme-change'
    import Notifications from 'svelte-notifications'
    import Alert from '../lib/Alert.svelte';

    import '../app.css'

    onMount(() => {
        themeChange(false)
    });
</script>

<div class='navbar bg-neutral text-neutral-content'>
    <div class='flex-1'>
        <div class='ml-16 font-semibold normal-case text-2xl'>
            <i class='fa-solid fa-shield-dog' />
            TaskGuardian
        </div>
    </div>
    <div class='flex-none gap-4 mr-32'>
        <label class='swap swap-rotate'>
            <input data-toggle-theme="dracula,emerald" data-act-class="active" type='checkbox' id='darkMode' />
            <i class='fa-solid fa-sun swap-off fill-current w-6 h-6' />
            <i class='fa-solid fa-moon swap-on fill-current w-6 h-6' />
        </label>
    </div>
</div>

<Notifications item={Alert}>
    <div class='container mx-auto my-16'>
        <div class='prose max-w-none'>
            <slot />
        </div>
    </div>
</Notifications>

<footer class='footer footer-center p-4 bg-base-300 text-base-content'>
    <div>
        <p>created by bernard siebens <a href='https://github.com/bsiebens/taskguardian' class='hover:text-secondary'><i class='fa-brands fa-github ml-2' /></a></p>
    </div>
</footer>