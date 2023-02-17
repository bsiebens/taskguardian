import { TaskwarriorLib } from "taskwarrior-lib";

import type { PageServerLoad, Actions } from "./$types";
import type { TaskAnnotation, Task } from "taskwarrior-lib";

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

        return { heading: 'Task updated', type: 'success', message: 'Task "' + task.description + '" marked as ' + task.status};
    },
    delete: async ({ request }) => {
        const data = await request.formData();
        let task = taskwarrior.load(data.get('id'))[0];

        task.status = task.status === 'deleted' ? 'pending' : 'deleted';
        taskwarrior.update([task]);

        return { heading: 'Task updated', type: 'success', message: 'Task "' + task.description + '" marked as ' + task.status};
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
        const data = await request.formData();
        let task: Task = {};

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
                return { heading: 'Task created', type: 'success', message: 'Task "' + task.description + '" added' };
            } else {
                return { heading: 'Task updated', type: 'success', message: 'Task "' + task.description + '" updated' };
            }
        } catch (error) {
            return { heading: 'Task creation error', type: 'error', message: 'Error: ' + error };
        }
    }
} satisfies Actions;