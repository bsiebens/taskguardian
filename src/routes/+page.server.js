import { TaskwarriorLib, Task } from "taskwarrior-lib"
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
            return { type: 'success', message: 'Synced succesfully with taskserver' }
        } catch (error) {
            return { type: 'error', message: 'Sync could not be executed: ' + error }
        }
    },
    add: async ({ request }) => {
        const data = await request.formData();
        let task = {
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

        taskwarrior.update([task]);
        return { type: 'success', message: 'Task ' + task.description + ' added' };
    }
}