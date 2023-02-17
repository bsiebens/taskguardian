import { TaskwarriorLib } from "taskwarrior-lib";

import type { PageServerLoad, Actions } from "./$types";

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

    },
    edit: async ({ request }) => {

    }
} satisfies Actions;