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
        uuid: "UUID",
        description: "Test task"
    }
};