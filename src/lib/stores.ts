import { writable, derived } from "svelte/store";
import { convertTaskwarriorDateToISO8601Format } from "./utilities";

import type { Writable } from "svelte/store";
import type { Task } from "taskwarrior-lib";

export const activeTab = writable('next');
export const tasks = writable([]);

function filteredTaskList(taskList: Task[], taskFilter: string) {
    if (taskFilter === 'all') return taskList;
    if (taskFilter === 'recurring') return taskList.filter(function (task) { return task.status === 'recurring' });
    if (taskFilter === 'deleted') return taskList.filter(function (task) { return task.status === 'deleted' });
    if (taskFilter === 'completed') return taskList.filter(function (task) { return task.status === 'completed' });
    if (taskFilter === 'next') return taskList.filter(function (task) {
        if (task.status != 'pending') return false
        if (task.wait === undefined) return true

        // @ts-ignore
        return new Date(convertTaskwarriorDateToISO8601Format(task.wait)) <= new Date()
    });
    if (taskFilter === 'later') return taskList.filter(function (task) {
        if (task.status != 'pending') return false
        if (task.wait === undefined) return false

        // @ts-ignore
        return new Date(convertTaskwarriorDateToISO8601Format(task.wait)) > new Date()
    });

    return taskList;
}

export const taskList: Writable<Task[]> = writable([]);
export const taskFilter: Writable<string> = writable("all");

export const pendingTasks = derived(taskList, $taskList => {
    return $taskList.filter(function (task) {
        return task.status === 'pending';
    }).map(task => task.uuid);
}, []);

export const filteredTasks = derived([taskList, taskFilter], ([$taskList, $taskFilter]) => {
    return filteredTaskList($taskList, $taskFilter);
}, []);