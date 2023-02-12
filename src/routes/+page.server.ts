import { TaskwarriorLib } from "taskwarrior-lib";

import type { Task } from "taskwarrior-lib";
import type { PageServerLoad } from "./$types";

const taskwarrior = new TaskwarriorLib();

export const load = (async ({ params }) => {
    return {
        tasks: taskwarrior.load()
    }
}) satisfies PageServerLoad;