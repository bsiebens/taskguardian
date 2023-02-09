<script>
	import moment from 'moment';
	import { createRender, createTable, Render, Subscribe } from 'svelte-headless-table';
	import { IconArrowDown, IconArrowsSort, IconArrowUp } from '@tabler/icons-svelte';
	import { addSortBy } from 'svelte-headless-table/plugins';
	import { tasks } from './stores';
	import { convertTaskwarriorDateToISO8601Format } from './utilities';
	import TaskIcons from './TaskIcons.svelte';
	import TaskDescription from './TaskDescription.svelte';

	/**
	 * @type {[]}
	 */
	export let pendingTasks;

	const priorityToScore = { undefined: 0, L: 1, M: 2, H: 3 };

	/**
	 * @param {string | undefined} date_string
	 */
	function formatDateToRelativeDate(date_string) {
		if (date_string === undefined) return '';
		return moment(convertTaskwarriorDateToISO8601Format(date_string)).fromNow();
	}

	/**
	 * @param {import('taskwarrior-lib').Task} task
	 * @param {string | any[]} pendingTasks
	 */
	function isTaskBlocked(task, pendingTasks) {
		if (task.depends === undefined) return false;

		let blocked = false;
		task.depends.forEach((dependency) => {
			if (pendingTasks.includes(dependency)) {
				blocked = true;
			}
		});

		return blocked;
	}

	/**
	 * @param {import('taskwarrior-lib').Task} task
	 */
	function defineTaskIcons(task) {
		if (task.status === 'deleted') return '<i class="fa-solid fa-trash" />';

		return 'bla';
	}

	/**
	 * @param {import('taskwarrior-lib').Task} task
	 */
	function defineRowClass(task) {
		if (task.status === 'completed' || task.status === 'deleted' || task.status === 'recurring') return 'hover';
		if (isTaskBlocked(task, pendingTasks)) return 'hover text-neutral-content [&>*]:bg-neutral hover:text-base-content';
		// @ts-ignore
		if (new Date(convertTaskwarriorDateToISO8601Format(task.due)) <= new Date()) return 'hover text-error-content [&>*]:bg-error hover:text-base-content';
		// @ts-ignore
		if (new Date(convertTaskwarriorDateToISO8601Format(task.due)) - new Date() <= 24 * 60 * 60 * 1000) return 'hover text-warning-content [&>*]:bg-warning hover:text-base-content';

		return 'hover';
	}

	const table = createTable(tasks, {
		sort: addSortBy({ initialSortKeys: [{ id: 'urgency', order: 'desc' }] })
	});

	const columns = table.createColumns([
		table.display({
			header: '',
			id: 'icons',
			cell: ({ row }) => createRender(TaskIcons, { task: row.original, pendingTasks: pendingTasks })
		}),
		table.column({
			header: 'Description',
			accessor: 'description',
			cell: ({ row }) => createRender(TaskDescription, { task: row.original }),
			plugins: { sort: { disable: true } }
		}),
		table.column({
			header: 'Project',
			accessor: 'project',
			cell: ({ value }) => (value === undefined ? '' : value.replace('.', ' / '))
		}),
		table.column({
			header: 'Priority',
			accessor: 'priority',
			cell: ({ value }) => (value === undefined ? '' : value),
			plugins: { sort: { getSortValue: (item) => priorityToScore[item] } }
		}),
		table.column({
			header: 'Due',
			accessor: 'due',
			cell: ({ value }) => formatDateToRelativeDate(value),
			plugins: { sort: { getSortValue: (item) => new Date(convertTaskwarriorDateToISO8601Format(item, -1)).getTime() } }
		}),
		table.column({
			header: 'Wait',
			accessor: 'wait',
			cell: ({ value }) => formatDateToRelativeDate(value),
			plugins: { sort: { getSortValue: (item) => new Date(convertTaskwarriorDateToISO8601Format(item, -1)).getTime() } }
		}),
		table.column({
			header: 'Urgency',
			accessor: 'urgency'
		}),
		table.display({
			header: '',
			id: 'actions',
			cell: ({ row }) => createRender(TaskIcons, { task: row.original, pendingTasks: pendingTasks })
		})
	]);

	const { headerRows, rows, tableAttrs, tableBodyAttrs } = table.createViewModel(columns);
</script>

<div class="overflow-x-auto">
	<table {...$tableAttrs} class="table w-full">
		<thead>
			{#each $headerRows as headerRow (headerRow.id)}
				<Subscribe rowAttrs={headerRow.attrs()} let:rowAttrs>
					<tr {...rowAttrs}>
						{#each headerRow.cells as cell (cell.id)}
							<Subscribe attrs={cell.attrs()} let:attrs props={cell.props()} let:props>
								<th {...attrs} on:click={props.sort.toggle}>
									<div class="flex flex-row items-center">
										<Render of={cell.render()} />
										{#if props.sort.order === 'asc'}
											<IconArrowUp class="ml-1" />
										{:else if props.sort.order === 'desc'}
											<IconArrowDown class="ml-1" />
										{:else if ['Project', 'Priority', 'Due', 'Wait', 'Urgency'].includes(cell.label)}
											<IconArrowsSort class="ml-1" />
										{/if}
									</div>
								</th>
							</Subscribe>
						{/each}
					</tr>
				</Subscribe>
			{/each}
		</thead>
		<tbody {...$tableBodyAttrs}>
			{#each $rows as row (row.id)}
				<Subscribe rowAttrs={row.attrs()} let:rowAttrs>
					<tr {...rowAttrs} class={defineRowClass(row.original)}>
						{#each row.cells as cell (cell.id)}
							<Subscribe attrs={cell.attrs()} let:attrs>
								<td {...attrs}>
									<Render of={cell.render()} />
								</td>
							</Subscribe>
						{/each}
					</tr>
				</Subscribe>
			{/each}
		</tbody>
	</table>
</div>
