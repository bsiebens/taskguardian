import { TaskwarriorLib } from "taskwarrior-lib";

import type { PageServerLoad, Actions } from "./$types";
import type { TaskAnnotation } from "taskwarrior-lib";

const taskwarrior = new TaskwarriorLib();

export const load = (async ({ depends }) => {
    depends('taskwarrior:data');

    return {
        tasks: taskwarrior.load()
    }
}) satisfies PageServerLoad;

export const actions = {
    sync: async () => {
        try {
            taskwarrior.executeCommand('sync');
            return {
                heading: 'Sync status', type: 'success', message: 'Synced succesfully with taskserver'
            }
        } catch (error) {
            return { heading: 'Sync status', type: 'error', message: 'Sync could not be executed: ' + error }
        }
    },
    complete: async ({ request }) => {
        const data = await request.formData();
        let task = taskwarrior.load(data.get('id'))[0];

        task.status = task.status === 'pending' ? 'completed' : 'pending';
        taskwarrior.update([task]);

        return { heading: 'Task updated', type: 'success', message: 'Task marked as ' + task.status};
    },
    delete: async ({ request }) => {
        const data = await request.formData();
        let task = taskwarrior.load(data.get('id'))[0];

        task.status = task.status === 'deleted' ? 'pending' : 'deleted';
        taskwarrior.update([task]);

        return { heading: 'Task updated', type: 'success', message: 'Task marked as ' + task.status};
    },
    annotate: async ({ request }) => {
        const data = await request.formData();
        let task = taskwarrior.load(data.get('id'))[0];

        var tzoffset = (new Date()).getTimezoneOffset() * 60000;
        var localISOTime = (new Date(Date.now() - tzoffset)).toISOString();
        let annotation: TaskAnnotation = {
            entry: localISOTime,
            description: data.get('annotation'),
        }

        if (task.annotations === undefined) {
            task.annotations = [annotation];
        } else {
            task.annotations.push(annotation);
        }

        taskwarrior.update([task]);

        return { heading: 'Task updated', type: 'success', message: 'Annotation added to task' };
    },
    edit: async ({ request }) => {

    }
} satisfies Actions;