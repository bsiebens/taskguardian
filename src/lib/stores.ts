import { writable, derived } from "svelte/store";
import { convertTaskwarriorDateToISO8601Format } from "./utils";

import type { Writable } from "svelte/store";
import type { Task } from "taskwarrior-lib";

function filterTaskList(taskList: Task[], taskFilter: string) {
    if (taskFilter === 'recurring') {
        return taskList.filter(function (task) {
            return task.status === 'recurring';
        });
    } else if (taskFilter === 'deleted') {
        return taskList.filter(function (task) {
            return task.status === 'deleted';
        });
    } else if (taskFilter === 'completed') {
        return taskList.filter(function (task) {
            return task.status === 'completed';
        });
    } else if (taskFilter === 'next') {
        return taskList.filter(function (task) {
            if (task.status != 'pending') return false;
            if (task.wait === undefined) return true;

            // @ts-ignore
            return new Date(convertTaskwarriorDateToISO8601Format(task.wait)) <= new Date();
        });
    } else if (taskFilter === 'later') {
        return taskList.filter(function (task) {
            if (task.status != 'pending') return false;
            if (task.wait === undefined) return false;

            // @ts-ignore
            return new Date(convertTaskwarriorDateToISO8601Format(task.wait)) > new Date();
        });
    } else {
        return taskList;
    }
}

export const taskList: Writable<Task[]> = writable([]);
export const taskFilter: Writable<string> = writable("next");

export const pendingTasks = derived(taskList, $taskList => {
    return $taskList.filter(function (task) {
        return task.status === 'pending';
    }).map(task => task.uuid);
});

export const filteredTasks = derived([taskList, taskFilter], ([$taskList, $taskFilter]) => {
    return filterTaskList($taskList, $taskFilter);
}, []);