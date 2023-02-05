<script>
    import moment from 'moment';
    import { createTable, Render, Subscribe, createRender } from 'svelte-headless-table';
    import { addSortBy, addResizedColumns } from 'svelte-headless-table/plugins';
    import { tasks } from "./stores";
    import TaskIcons from './TaskIcons.svelte';
    import TaskDescription from './TaskDescription.svelte';
    import TaskActions from './TaskActions.svelte';
    import { convertTaskwarriorDateToISO8601Format } from "./utilities";
    import { IconArrowsSort, IconArrowUp, IconArrowDown, IconPencil, IconCheck, IconTrash } from '@tabler/icons-svelte';

    const priorityMapping = {
        undefined: 0,
        L: 1,
        M: 2,
        H: 3
    }

    function formatDateToRelativeDate(dateString) {
        if (dateString === undefined) return '';

        return moment(convertTaskwarriorDateToISO8601Format(dateString)).fromNow();
    }
    
    const table = createTable(tasks, {
        sort: addSortBy({initialSortKeys: [{id: 'urgency', order: 'desc'}]}),
        resize: addResizedColumns(),
    });

    const columns = table.createColumns([
        table.display({
            id: 'icons',
            header: '',
            cell: ({ row }) => createRender(TaskIcons, { item: row.original }),
        }),
        table.column({
            header: 'Description',
            accessor: (item) => item,
            cell: ({ value }) => createRender(TaskDescription, { item: value }),
            id: 'description',
            plugins: {
                sort: {
                    disable: true,
                },
            },
        }),
        table.column({
            header: 'Project',
            accessor: 'project',
            cell: ({ value }) => (value === undefined) ? '' : value,
        }),
        table.column({
            header: 'Priority',
            accessor: 'priority',
            cell: ({ value }) => (value === undefined) ? '' : value,
            plugins: {
                sort: {
                    getSortValue: (item) => priorityMapping[item],
                }
            },
        }),
        table.column({
            header: 'Due',
            accessor: 'due',
            cell: ({ value }) => formatDateToRelativeDate(value),
            plugins: {
                sort: {
                    getSortValue: (item) => new Date(convertTaskwarriorDateToISO8601Format(item, -1)).getTime(),
                },
            },
        }),
        table.column({
            header: 'Wait',
            accessor: 'wait',
            cell: ({ value }) => formatDateToRelativeDate(value),
            plugins: {
                sort: {
                    getSortValue: (item) => new Date(convertTaskwarriorDateToISO8601Format(item, -1)).getTime(),
                },
            },
        }),
        table.column({
            header: 'Urgency',
            accessor: 'urgency',
        }),
        table.display({
            id: 'actions',
            header: '',
            cell: ({ row }) => createRender(TaskActions, { item: row.original }),
        })
    ]);
    
    const { headerRows, rows, tableAttrs, tableBodyAttrs } = table.createViewModel(columns);
</script>

<div class="table-container">
    <table {...$tableAttrs} class='table table-hover'>
        <thead>
            {#each $headerRows as headerRow (headerRow.id)}
                <Subscribe rowAttrs={headerRow.attrs()} let:rowAttrs>
                    <tr {...rowAttrs}>
                        {#each headerRow.cells as cell (cell.id)}
                            <Subscribe attrs={cell.attrs()} let:attrs props={cell.props()} let:props>
                                <th {...attrs} on:click={props.sort.toggle}>
                                    <div class='flex flex-row'>
                                        <Render of={cell.render()} />
                                        {#if props.sort.order === 'asc'}
                                            <IconArrowUp class='ml-1' />
                                        {:else if props.sort.order === 'desc'}
                                            <IconArrowDown class='ml-1' />
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
                    <tr {...rowAttrs}>
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