import { derived, writable } from "svelte/store";
import { convertTaskwarriorDateToISO8601Format } from "./utils";

import type { Writable } from "svelte/store";
import type { Task } from "taskwarrior-lib";

function sortByFieldAndDirection(taskList: Task[], sortingField: "priority" | "urgency", sortingDirection: "asc" | "desc" = "desc") {
    const priorityToScore = { "": 0, L: 1, M: 2, H: 3, undefined: 0 };

    let sortedTasks = taskList.sort((a, b) => {
        let varA = a[sortingField];
        let varB = b[sortingField];

        if (sortingField === "priority") {
            varA = priorityToScore[varA];
            varB = priorityToScore[varB];
        }

        let comparison = 0;
        if (varA > varB) {
            comparison = 1;
        } else if (varA < varB) {
            comparison = -1;
        }

        return sortingDirection === "desc" ? comparison * -1 : comparison;
    });
    
    return sortedTasks;
}

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
    } else if (taskFilter === 'inbox') {
        return taskList.filter(function (task) {
            if (task.status != 'pending') return false;

            return task.tags?.includes("inbox");
        });
    } else {
        return taskList;
    }
}

export const taskList: Writable<Task[]> = writable([]);
export const taskFilter: Writable<string> = writable("next");
export const taskSortingField: Writable<"urgency" | "priority"> = writable("urgency");
export const taskSortingDirection: Writable<"asc" | "desc"> = writable("desc");

export const pendingTasks = derived(taskList, $taskList => {
    return $taskList.filter(function (task) {
        return task.status === 'pending';
    }).map(task => task.uuid);
});

export const filteredTasks = derived([taskList, taskFilter, taskSortingField, taskSortingDirection], ([$taskList, $taskFilter, $taskSortingField, $taskSortingDirection]) => {
    return sortByFieldAndDirection(filterTaskList($taskList, $taskFilter), $taskSortingField, $taskSortingDirection);
}, []);

export const inboxTaskCount = derived(taskList, $taskList => {
    return filterTaskList($taskList, "inbox").length;
}, 0);
