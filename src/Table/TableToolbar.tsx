import { MouseEvent, MouseEventHandler, PropsWithChildren, ReactElement, useCallback, useState } from 'react'

import { TableInstance } from 'react-table'

import { ToolbarStyled, LeftIconsSection, RightIconsSection, Divider } from '../Components/BaseToolbar';
import Count from '../Components/Count';
import Search from '../Components/Search';

import { TableMouseEventHandler } from '../../types/react-table-config'
import { ColumnHidePage } from './ColumnHidePage'
import { FilterPage } from './FilterPage'

type InstanceActionButton<T extends Record<string, unknown>> = {
  instance: TableInstance<T>
  icon?: JSX.Element
  onClick: TableMouseEventHandler
  enabled?: (instance: TableInstance<T>) => boolean
  label: string
  variant?: 'right' | 'left'
}

type ActionButton = {
  icon?: JSX.Element
  onClick: MouseEventHandler
  enabled?: boolean
  label: string
  variant?: 'right' | 'left'
}


export const InstanceSmallIconActionButton = <T extends Record<string, unknown>>({
  instance,
  icon,
  onClick,
  label,
  enabled = () => true,
  variant,
}: InstanceActionButton<T>): ReactElement => {
  return (
    <>
    {/* todo: add Tooltip  */}
    {/* <Tooltip title={label} aria-label={label}> */}
      <span>
        <button
          onClick={onClick(instance)}
          disabled={!enabled(instance)}
        >
          {icon}
        </button>
      </span>
    {/* </Tooltip> */}
    </>
  )
}

export const SmallIconActionButton = ({
  icon,
  onClick,
  label,
  enabled = true,
  variant,
}: ActionButton): ReactElement => {
  return (
    <>
    {/* todo: add Tooltip  */}
    {/* <Tooltip title={label} aria-label={label}> */}
      <span>
        <button
          onClick={onClick}
          disabled={!enabled}
        >
          {icon}
        </button>
      </span>
    {/* </Tooltip> */}
    </>
  )
}

type TableToolbarProps<T extends Record<string, unknown>> = {
  instance: TableInstance<T>
  onAdd?: TableMouseEventHandler
  onDelete?: TableMouseEventHandler
  onEdit?: TableMouseEventHandler
}

export function TableToolbar<T extends Record<string, unknown>>({
  instance,
  onDelete,
  onEdit,
}: PropsWithChildren<TableToolbarProps<T>>): ReactElement | null {
  const { columns } = instance
  const [anchorEl, setAnchorEl] = useState<Element | undefined>(undefined)
  const [columnsOpen, setColumnsOpen] = useState(false)
  const [filterOpen, setFilterOpen] = useState(false)
  const hideableColumns = columns.filter((column) => !(column.id === '_selector'));
  const visibileColumnsCount = columns.filter((column) => column.isVisible).length;

  console.log('columns', columns);

  const handleColumnsClick = useCallback(
    (event: MouseEvent) => {
      setAnchorEl(event.currentTarget)
      setColumnsOpen(true)
    },
    [setAnchorEl, setColumnsOpen]
  )

  const handleFilterClick = useCallback(
    (event: MouseEvent) => {
      setAnchorEl(event.currentTarget)
      setFilterOpen(true)
    },
    [setAnchorEl, setFilterOpen]
  )

  const handleClose = useCallback(() => {
    setColumnsOpen(false)
    setFilterOpen(false)
    setAnchorEl(undefined)
  }, [])

  return (
    <ToolbarStyled>
      <LeftIconsSection>
        <Search instance={instance} />

        <SmallIconActionButton
          icon={<span>Filter Icon</span>}
          onClick={handleFilterClick}
          label="Filter by columnsFilter by columnsFilter by columnsFilter by columnsFilter by columns"
          variant="right"
        />

        {/* // favorite  */}
        <Count icon={<span>favorite Icon</span>} count={`${0}`} />

        <Divider />

        {onEdit && (
          <InstanceSmallIconActionButton<T>
            instance={instance}
            icon={<span>Copy Icon</span>}
            onClick={onEdit}
            label="Edit"
            enabled={({ state }: TableInstance<T>) =>
              state.selectedRowIds &&
              Object.keys(state.selectedRowIds).length === 1
            }
            variant="left"
          />
        )}

        <Divider />

        {onDelete && (
          <InstanceSmallIconActionButton<T>
            instance={instance}
            icon={<span>Delete Icon</span>}
            onClick={onDelete}
            label="Delete"
            enabled={({ state }: TableInstance<T>) =>
              state.selectedRowIds &&
              Object.keys(state.selectedRowIds).length > 0
            }
            variant="left"
          />
        )}

        <FilterPage<T>
          instance={instance}
          onClose={handleClose}
          show={filterOpen}
          anchorEl={anchorEl}
        />

      </LeftIconsSection>
      <RightIconsSection>
        <ColumnHidePage<T>
          instance={instance}
          onClose={handleClose}
          show={columnsOpen}
          anchorEl={anchorEl}
        />
        {hideableColumns.length > 1 && (
          <>
            {(visibileColumnsCount < columns.length) && <Count count={`${visibileColumnsCount}/${columns.length}`} />}
            <SmallIconActionButton
              icon={<span>Columns Icon</span>}
              onClick={handleColumnsClick}
              label="Show / hide columns"
              variant="right"
            /></>
        )}
      </RightIconsSection>
    </ToolbarStyled>
  )
}
