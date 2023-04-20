// @ts-ignore
import TaskCard from "./TaskCard.svelte";

export default {
    title: "TaskCard",
    component: TaskCard,
    excludeStories: "/.*Data$/",
};

const Template = ({ ...args }) => ({
    Component: TaskCard,
    props: args
});

export const Default = Template.bind({});
Default.args = {
    task: {
        id: 11,
        description: "Wegdoen oude boekenkasten",
        due: "20240228T230000Z",
        entry: "20230129T162841Z",
        modified: "20230217T131432Z",
        priority: "L",
        project: "huis.bureau",
        status: "pending",
        uuid: "91eec140-c2e6-4005-8ed8-a59bb011fbc7",
        urgency: 24.6411
    }
};

export const Completed = Template.bind({});
Completed.args = {
    task: {
        ...Default.args.task,
        status: "completed",
    }
};

export const Deleted = Template.bind({});
Deleted.args = {
    task: {
        ...Default.args.task,
        status: "deleted",
    }
};

export const StartLater = Template.bind({});
var tzoffset = (new Date()).getTimezoneOffset() * 60000;
var startDate = (new Date(Date.now() + (20 * 60 * 60 * 1000) - tzoffset)).toISOString();

StartLater.args = {
    task: {
        ...Default.args.task,
        scheduled: startDate,
    }
};

export const Tagged = Template.bind({});
Tagged.args = {
    task: {
        ...Default.args.task,
        tags: [
            "bureau"
        ],
    }
};

export const AnnotatedUntagged = Template.bind({});
AnnotatedUntagged.args = {
    task: {
        ...Default.args.task,
        annotations: [
            {
                entry: "20230217T131432Z",
                description: "Ineens naar containerpark"
            },
            {
                entry: "20220217T131432Z",
                description: "Ineens naar containerpark, Ineens naar containerpark"
            },
            {
                entry: "20230217T131432Z",
                description: "Ineens naar containerpark"
            }
        ],
    }
};

export const AnnotatedTagged = Template.bind({});
AnnotatedTagged.args = {
    task: {
        ...Tagged.args.task,
        annotations: [
            {
                entry: "20230217T131432Z",
                description: "Ineens naar containerpark"
            }
        ],
    }
};

export const Recurring = Template.bind({});
Recurring.args = {
    task: {
        ...Default.args.task,
        recur: "2days",
        rtype: "periodic",
        status: "recurring"
    }
};

export const OverDue = Template.bind({});
OverDue.args = {
    task: {
        ...Default.args.task,
        due: "20230101T100000Z",
    }
};

export const DueNext24Hours = Template.bind({});
var tzoffset = (new Date()).getTimezoneOffset() * 60000;
var dueDate = (new Date(Date.now() + (20 * 60 * 60 * 1000) - tzoffset)).toISOString();

DueNext24Hours.args = {
    task: {
        ...Default.args.task,
        due: dueDate,
    }
};