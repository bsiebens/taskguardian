import * as Router from '@koa/router';
import * as Koa from 'koa';
import * as bodyParser from 'koa-bodyparser';
import * as logger from 'koa-logger';
import * as qs from 'koa-qs';

import { TaskError } from 'taskwarrior-lib';
import syncRouter from './sync';
import tasksRouter from './tasks';

const app = new Koa();

qs(app);
app.use(bodyParser());
app.use(logger());

app.use(async (context, next) => {
    try {
        await next();
    } catch (error) {
        if (error instanceof TaskError) {
            (error as any).expose = true;
            (error as any).status = 400;
        }

        throw error;
    }
});

const router = new Router();
router.use('/tasks', tasksRouter.routes());
router.use('/sync', syncRouter.routes());

app.use(router.routes());
app.use(router.allowedMethods());

const production = process.env.NODE_ENV === 'production';
const address = production ? '0.0.0.0' : 'localhost';
app.listen(3000, address);

console.log(`API server running on http://${address}:3000`);