import { TaskwarriorLib } from "taskwarrior-lib";
import { convertTaskwarriorDateToISO8601Format } from "../lib/utilities";
import { pendingTasks } from '../lib/stores';

const taskwarrior = new TaskwarriorLib();

export function load() {
    const tasks = taskwarrior.load();
    
    pendingTasks.set(tasks.filter(function(task) { return task.status == 'pending' }).map(task => task.uuid));

    return {
        tasks: {
            deleted: tasks.filter(function(task) { return task.status == 'deleted' }),
            completed: tasks.filter(function(task) { return task.status == 'completed' }),
            later: tasks.filter(function(task) {
                if (task.wait === undefined) return false;
                return new Date(convertTaskwarriorDateToISO8601Format(task.wait)) > new Date();
            }),
            next: tasks.filter(function(task) {
                if (task.status != 'pending') return false;
                if (task.wait === undefined) return true;
                return new Date(convertTaskwarriorDateToISO8601Format(task.wait)) <= new Date();
            }),
            recurring: tasks.filter(function(task) { return task.status == 'recurring' })
        }
    }
}