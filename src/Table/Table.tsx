import React, { MouseEventHandler, PropsWithChildren, ReactElement, useEffect } from 'react'
import {
  CellProps,
  ColumnInstance,
  FilterProps,
  HeaderProps,
  Hooks,
  Row,
  TableInstance,
  TableOptions,
  useColumnOrder,
  useExpanded,
  useFilters,
  useFlexLayout,
  useGlobalFilter,
  useGroupBy,
  usePagination,
  useResizeColumns,
  useRowSelect,
  useSortBy,
  useTable,
} from 'react-table'

import { camelToWords, useDebounce, useLocalStorage } from '../utils'
import { FilterChipBar } from './FilterChipBar'
import { fuzzyTextFilter, numericTextFilter, enumMatchFilter } from './filters'

import { TablePagination } from './TablePagination'
import { TableBody } from './TableBody'
import { TableHeader } from './TableHeader'

// todo: cleanup this
import {
  HeaderCheckbox,
  RowCheckbox,
} from './TableStyles'
import { TextField } from '@material-ui/core'

import { TableToolbar } from './TableToolbar'
import { TooltipCellRenderer } from './TooltipCell'


export interface TableProperties<T extends Record<string, unknown>> extends TableOptions<T> {
  name: string
  onAdd?: (instance: TableInstance<T>) => MouseEventHandler
  onDelete?: (instance: TableInstance<T>) => MouseEventHandler
  onEdit?: (instance: TableInstance<T>) => MouseEventHandler
  onClick?: (row: Row<T>) => void
}

const DefaultHeader: React.FC<HeaderProps<any>> = ({ column }) => (
  <>{column.id.startsWith('_') ? null : camelToWords(column.id)}</>
)

// yes this is recursive, but the depth never exceeds three so it seems safe enough
const findFirstColumn = <T extends Record<string, unknown>>(columns: Array<ColumnInstance<T>>): ColumnInstance<T> =>
  columns[0].columns ? findFirstColumn(columns[0].columns) : columns[0]

function DefaultColumnFilter<T extends Record<string, unknown>>({ columns, column }: FilterProps<T>) {
  const { id, filterValue, setFilter, render } = column
  const [value, setValue] = React.useState(filterValue || '')
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value)
  }
  // ensure that reset loads the new value
  useEffect(() => {
    setValue(filterValue || '')
  }, [filterValue])

  const isFirstColumn = findFirstColumn(columns) === column
  return (
    <TextField
      name={id}
      label={render('Header')}
      InputLabelProps={{ htmlFor: id }}
      value={value}
      autoFocus={isFirstColumn}
      variant='standard'
      onChange={handleChange}
      onBlur={(e) => {
        setFilter(e.target.value || undefined)
      }}
    />
  )
}

const selectionHook = (hooks: Hooks<any>) => {
  hooks.allColumns.push((columns) => [
    // Let's make a column for selection
    {
      id: '_selector',
      disableResizing: true,
      disableGroupBy: true,
      minWidth: 45,
      width: 45,
      maxWidth: 45,
      Aggregated: undefined,
      // The header can use the table's getToggleAllRowsSelectedProps method
      // to render a checkbox
      Header: ({ getToggleAllRowsSelectedProps }: HeaderProps<any>) => (
        <HeaderCheckbox {...getToggleAllRowsSelectedProps()} />
      ),
      // The cell can use the individual row's getToggleRowSelectedProps method
      // to the render a checkbox
      Cell: ({ row }: CellProps<any>) => <RowCheckbox {...row.getToggleRowSelectedProps()} />,
    },
    ...columns,
  ])
  hooks.useInstanceBeforeDimensions.push(({ headerGroups }) => {
    // fix the parent group of the selection button to not be resizable
    const selectionGroupHeader = headerGroups[0].headers[0]
    selectionGroupHeader.canResize = false
  })
}


const defaultColumn = {
  Filter: DefaultColumnFilter,
  Cell: TooltipCellRenderer,
  Header: DefaultHeader,
  // When using the useFlexLayout:
  minWidth: 30, // minWidth is only used as a limit for resizing
  width: 150, // width is used for both the flex-basis and flex-grow
  maxWidth: 200, // maxWidth is only used as a limit for resizing
}

const hooks = [
  useColumnOrder,
  useFilters,
  useGlobalFilter,
  useGroupBy,
  useSortBy,
  useExpanded,
  useFlexLayout,
  usePagination,
  useResizeColumns,
  useRowSelect,
  selectionHook,
]

const filterTypes = {
  fuzzyText: fuzzyTextFilter,
  numeric: numericTextFilter,
  enumMatch: enumMatchFilter,
}

export function Table<T extends Record<string, unknown>>(props: PropsWithChildren<TableProperties<T>>): ReactElement {
  const { name, columns, onAdd, onDelete, onEdit } = props;
  const [initialState, setInitialState] = useLocalStorage(`tableState:${name}`, {});

  const instance = useTable<T>(
    {
      ...props,
      columns,
      filterTypes,
      defaultColumn,
      initialState,
    },
    ...hooks
  )

  const { getTableProps, state } = instance
  const debouncedState = useDebounce(state, 500);

  useEffect(() => {
    const { sortBy, filters, pageSize, columnResizing, hiddenColumns } = debouncedState
    const val = {
      sortBy,
      filters,
      pageSize,
      columnResizing,
      hiddenColumns,
    }
    setInitialState(val)
  }, [setInitialState, debouncedState]);


  const { role: tableRole, ...tableProps } = getTableProps()
  return (
    <>
      <TableToolbar instance={instance} {...{ onAdd, onDelete, onEdit }} />
      <FilterChipBar<T> instance={instance} />
      <table {...tableProps} >
        <TableHeader<T> instance={instance} />
        <TableBody<T> instance={instance} />
      </table>
      <TablePagination<T> instance={instance} />

    </>
  )
}
