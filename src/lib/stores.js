import { writable } from "svelte/store";

export let tasks = writable([]);
export let pendingTasks = writable([]);