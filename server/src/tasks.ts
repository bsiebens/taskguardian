import * as Router from '@koa/router';
import { Task } from 'taskwarrior-lib';
import taskwarrior from './taskwarrior';

const router = new Router();

router.get('/', async context => {
    const tasks = taskwarrior.load();
    context.body = tasks;
});

router.put('/', async context => {
    const body = context.request.body as { tasks: Task[] };
    const message = taskwarrior.update(body.tasks);

    context.status = 200;
});

router.delete('/', async context => {
    const tasks = context.query.tasks as string[];
    const message = taskwarrior.del(tasks.map(t => ({ uuid: t })));

    context.status = 200;
});

export default router;