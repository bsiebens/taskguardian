import { TaskwarriorLib } from "taskwarrior-lib";

import type { Task } from 'taskwarrior-lib';
import type { PageServerLoad } from './$types';

const taskwarrior = new TaskwarriorLib();

export const load = (async ({ params }) => {
    return {
        tasks: [],
    };
}) satisfies PageServerLoad;


/* import { TaskwarriorLib } from "taskwarrior-lib"
import { convertTaskwarriorDateToISO8601Format } from '../lib/utilities'

const taskwarrior = new TaskwarriorLib()

export function load() {
    const tasks = taskwarrior.load()
    const pendingTasks = tasks.filter(function (task) {
        return task.status === 'pending'
    }).map(task => task.uuid)

    return {
        tasks: {
            all: tasks,
            pending: pendingTasks,
            next: tasks.filter(function (task) {
                if (task.status != 'pending') return false
                if (task.wait === undefined) return true
                // @ts-ignore
                return new Date(convertTaskwarriorDateToISO8601Format(task.wait)) <= new Date()
            }),
            later: tasks.filter(function (task) {
                if (task.status != 'pending') return false
                if (task.wait === undefined) return false
                // @ts-ignore
                return new Date(convertTaskwarriorDateToISO8601Format(task.wait)) > new Date()
            }),
            recurring: tasks.filter(function (task) { return task.status === 'recurring' }),
            completed: tasks.filter(function (task) { return task.status === 'completed' }),
            deleted: tasks.filter(function (task) { return task.status === 'deleted' })
        }
    }
}

export const actions = {
    sync: async () => {
        try {
            taskwarrior.executeCommand('sync');
            return { heading: 'Sync status', type: 'success', message: 'Synced succesfully with taskserver' }
        } catch (error) {
            return { heading: 'Sync status', type: 'error', message: 'Sync could not be executed: ' + error }
        }
    },
    completed: async ({ request }) => {
        const data = await request.formData();
        let task = taskwarrior.load(data.get('id'))[0];

        task.status = 'completed';
        taskwarrior.update([task]);

        return { heading: 'Task marked as completed', type: 'success', message: task.description };
    },
    incompleted: async ({ request }) => {
        const data = await request.formData();
        let task = taskwarrior.load(data.get('id'))[0];

        task.status = 'pending';
        taskwarrior.update([task]);

        return { heading: 'Task marked as incompleted', type: 'success', message: task.description };
    },
    deleted: async ({ request }) => {
        const data = await request.formData();
        let task = taskwarrior.load(data.get('id'))[0];

        task.status = 'deleted';
        taskwarrior.update([task]);

        return { heading: 'Task deleted', type: 'success', message: task.description };
    },
    restored: async ({ request }) => {
        const data = await request.formData();
        let task = taskwarrior.load(data.get('id'))[0];

        task.status = 'pending';
        taskwarrior.update([task]);

        return { heading: 'Task restored', type: 'success', message: task.description };
    },
    annotate: async ({ request }) => {
        const data = await request.formData();
        let task = taskwarrior.load(data.get('id'))[0];
        var tzoffset = (new Date()).getTimezoneOffset() * 60000; //offset in milliseconds
        var localISOTime = (new Date(Date.now() - tzoffset)).toISOString();
        let annotation = {
            entry: localISOTime,
            description: data.get('annotation')
        }

        if (task.annotations === undefined) {
            task.annotations = [annotation];
        } else {
            task.annotations.push(annotation);
        }

        taskwarrior.update([task]);
        return { heading: 'Annotation added', type: "success", message: task.description };
    },
    update: async ({ request }) => {
        const data = await request.formData();
        let task = {};

        if (data.get('id') === null) {
            task = {
                description: data.get('description'),
                project: (data.get('project') === '') ? undefined : data.get('project'),
                due: (data.get('due') === '') ? undefined : data.get('due'),
                until: (data.get('until') === '') ? undefined : data.get('until'),
                wait: (data.get('wait') === '') ? undefined : data.get('wait'),
                scheduled: (data.get('scheduled') === '') ? undefined : data.get('scheduled'),
                tags: (data.get('tags') === '') ? undefined : data.get('tags').split(' '),
                priority: (data.get('priority') === '') ? undefined : data.get('priority'),
                recur: (data.get('recurrence') === 'on') ? data.get('period') : undefined,
            }
        } else {
            task = taskwarrior.load(data.get('id'))[0];
            task.description = data.get('description');
            task.project = (data.get('project') === '') ? undefined : data.get('project');
            task.due = (data.get('due') === '') ? undefined : data.get('due');
            task.until = (data.get('until') === '') ? undefined : data.get('until');
            task.wait = (data.get('wait') === '') ? undefined : data.get('wait');
            task.scheduled = (data.get('scheduled') === '') ? undefined : data.get('scheduled');
            task.tags = (data.get('tags') === '') ? undefined : data.get('tags').split(' ');
            task.priority = (data.get('priority') === '') ? undefined : data.get('priority');
            task.recur = (data.get('recurrence') === 'on') ? data.get('period') : undefined;
        }

        try {
            taskwarrior.update([task]);

            if (data.get('id') === null) {
                return { heading: 'Task created', type: 'success', message: 'Task ' + task.description + ' added' };
            } else {
                return { heading: 'Task updated', type: 'success', message: 'Task ' + task.description + ' updated' };
            }
        } catch (error) {
            return { heading: 'Task creation error', type: 'error', message: 'Error: ' + error };
        }
    }
} */