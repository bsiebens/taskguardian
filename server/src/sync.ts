import * as Router from '@koa/router';
import taskwarrior from './taskwarrior';

const router = new Router();

router.post('/', async context => {
    const message = taskwarrior.executeCommand('sync');

    context.status = 200;
});

export default router;