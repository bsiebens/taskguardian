//@ts-ignore
import TaskList from "./TaskList.svelte";

export default {
    title: "TaskList",
    component: TaskList,
    excludeStories: "/.*Data$/"
};

const Template = ({ ...args }) => ({
    Component: TaskList,
    props: args
});

var tzoffset = (new Date()).getTimezoneOffset() * 60000;
var dueDate = (new Date(Date.now() + (20 * 60 * 60 * 1000) - tzoffset)).toISOString();

export const Default = Template.bind({});
Default.args = {
    listDisplay: "default",
    tasks: [
        {
            id: 11,
            description: "Wegdoen oude boekenkasten",
            due: "20240228T230000Z",
            entry: "20230129T162841Z",
            modified: "20230217T131432Z",
            priority: "L",
            project: "huis.bureau",
            status: "pending",
            uuid: "91eec140-c2e6-4005-8ed8-a59bb011fbc7",
            urgency: 24.6411,
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
        },
        {
            id: 12,
            description: "Wegdoen oude boekenkasten",
            due: "20240228T230000Z",
            entry: "20230129T162841Z",
            modified: "20230217T131432Z",
            priority: "M",
            project: "huis.bureau",
            status: "pending",
            uuid: "91eec140-c2e6-4005-8ed8-a59bb011fbc7",
            urgency: 24.6411,
            tags: [
                "tag1", "tag2"
            ]
        },
        {
            id: 13,
            description: "Wegdoen oude boekenkasten",
            due: "20240228T230000Z",
            entry: "20230129T162841Z",
            modified: "20230217T131432Z",
            priority: "H",
            project: "huis.bureau",
            status: "pending",
            uuid: "91eec140-c2e6-4005-8ed8-a59bb011fbc7",
            urgency: 24.6411
        },
        {
            id: 13,
            description: "Wegdoen oude boekenkasten",
            due: "20230101T100000Z",
            entry: "20230129T162841Z",
            modified: "20230217T131432Z",
            priority: "H",
            project: "huis.bureau",
            status: "pending",
            uuid: "91eec140-c2e6-4005-8ed8-a59bb011fbc7",
            urgency: 24.6411
        },
        {
            id: 13,
            description: "Wegdoen oude boekenkasten",
            due: dueDate,
            entry: "20230129T162841Z",
            modified: "20230217T131432Z",
            priority: "H",
            project: "huis.bureau",
            status: "pending",
            uuid: "91eec140-c2e6-4005-8ed8-a59bb011fbc7",
            urgency: 24.6411
        }
    ]
};

export const Later = Template.bind({});
Later.args = {
    ...Default.args,
    listDisplay: "later"
};

export const Recurring = Template.bind({});
Recurring.args = {
    ...Default.args,
    listDisplay: "recurring"
};

export const Deleted = Template.bind({});
Deleted.args = {
    ...Default.args,
    listDisplay: "deleted"
};

export const Completed = Template.bind({});
Completed.args = {
    ...Default.args,
    listDisplay: "completed"
};




