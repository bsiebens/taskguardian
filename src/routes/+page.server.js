import { TaskwarriorLib } from "taskwarrior-lib"
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

        console.log(data);

        return { type: 'success', message: 'Task completed' }
    }
}