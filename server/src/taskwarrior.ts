import { TaskwarriorLib } from 'taskwarrior-lib';

const taskRCFile = process.env.TASKRC_PATH;
const taskDataDir = process.env.TASKDIR_PATH;

const taskwarrior = new TaskwarriorLib(taskRCFile, taskDataDir);

export default taskwarrior;