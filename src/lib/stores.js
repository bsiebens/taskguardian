import { writable } from "svelte/store";

export const activeTab = writable('next');
export const tasks = writable([]);