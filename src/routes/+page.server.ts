import type { satisfies } from "semver";
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
                heading: 'Sync status', type: 'succcess', message: 'Synces succesfully with taskserver'
            }
        } catch (error) {
            return { heading: 'Sync status', type: 'error', message: 'Sync could not be executed: ' + error }
        }
    }
} satisfies Actions;