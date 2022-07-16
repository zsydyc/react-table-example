import React, { MouseEventHandler, PropsWithChildren, ReactElement, useEffect } from 'react'
import {
  CellProps,
  Column,
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
import styled from '@emotion/styled'

import InfoIcon from '@material-ui/icons/Info'

import { Button } from '../Components/Base'
import { Divider } from '../Components/BaseToolbar'
import Count from '../Components/Count'
import { ContainerHeader, ContainerArticle, HeaderSection, HeaderTitle } from '../Components/ContentContainer'

import { TablePagination } from './TablePagination'
import { TableBody } from './TableBody'
import { TableHeader } from './TableHeader'

import { camelToWords, GenericApiType, LoadingStatus, useDebounce, useLocalStorage } from '../utils'
import { fuzzyTextFilter, numericTextFilter, enumMatchFilter } from './filters'

import { TableToolbar } from './TableToolbar'
import { TooltipCellRenderer } from './TooltipCell'
import {useTableContext} from './TableContext'
import {CircularProgress, LinearProgress} from '@material-ui/core'

// export interface TableProperties<T extends GenericApiType> extends TableOptions<T> {
export interface TableProperties<T extends GenericApiType> {
  name: string
  onAdd?: (instance: TableInstance<T>) => MouseEventHandler
  onDelete?: (instance: TableInstance<T>) => MouseEventHandler
  onEdit?: (instance: TableInstance<T>) => MouseEventHandler
  onClick?: (row: Row<T>) => void
  columns: ReadonlyArray<Column<T>>
  data?: Readonly<T[]>
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
    <>
      <label htmlFor={id}>{render('Header')}</label>

      <input
        name={id}
        id={id}
        value={value}
        autoFocus={isFirstColumn}
        // variant='standard'
        onChange={handleChange}
        onBlur={(e) => {
          setFilter(e.target.value || undefined)
        }}
      />
    </>
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
        <input type="checkbox" {...getToggleAllRowsSelectedProps()} />
      ),
      // The cell can use the individual row's getToggleRowSelectedProps method
      // to the render a checkbox
      Cell: ({ row }: CellProps<any>) => <input type="checkbox" {...row.getToggleRowSelectedProps()} />,
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

const ContentSection = styled.section`
  overflow: scroll;
`

export function Table<T extends GenericApiType>(props: PropsWithChildren<TableProperties<T>>): ReactElement {
  const { name, columns, onAdd, onDelete, onEdit } = props;

  const [initialState, setInitialState] = useLocalStorage(`tableState:${name}`, {});

  const { data, loadingStatus, isSearchLoading } = useTableContext()

  const instance = useTable<T>(
    {
      data: data as T[], // data is override by props data, in which case the context will be defaulted to []
      ...props,
      columns,
      filterTypes,
      // @ts-ignore
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

  const LoadingBar = () => {
    if (loadingStatus == LoadingStatus.loadingInitial
        || isSearchLoading)
      return <LinearProgress color="primary" />
    return null
  }

  const Spinner = () => {
    if (loadingStatus == LoadingStatus.loadingInitial
        || loadingStatus == LoadingStatus.lazyLoading
        || isSearchLoading)
      return <CircularProgress color="inherit" size={10} />
    return null
  }

  return (
    <ContainerArticle>
      <ContainerHeader>
        <HeaderSection>
          <Count title={<HeaderTitle>{name}</HeaderTitle>} count={data.length} />
          <Spinner />
        </HeaderSection>
        <HeaderSection>
          <Button>Create</Button>
          <Divider />
          <InfoIcon />
        </HeaderSection>
      </ContainerHeader>

      <TableToolbar instance={instance} {...{ onAdd, onDelete, onEdit }} />
      <LoadingBar />
      <ContentSection>
        <table {...tableProps} >
          <TableHeader<T> instance={instance} />
          <TableBody<T> instance={instance} />
        </table>
      </ContentSection>
      <TablePagination<T> instance={instance} typeDescriptor={name} />
    </ContainerArticle>
  )
}
