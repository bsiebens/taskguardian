<script lang="ts">
	import type { Task } from 'taskwarrior-lib';

	export let task: Task;
</script>

{task.description}
<div class="badge badge-primary">primary</div>

{@html `<pre>
(alias) type Task = {
    id?: number;
    status?: TaskStatus;
    uuid?: string;
    entry?: string;
    description?: string;
    start?: string;
    end?: string;
    due?: string;
    until?: string;
    wait?: string;
    modified?: string;
    scheduled?: string;
    recur?: string;
    mask?: string;
    imask?: number;
    parent?: string;
    project?: string;
    priority?: TaskPriority;
    depends?: string[];
    tags?: string[];
    annotations?: TaskAnnotation[];
}
import Task</pre>`}
