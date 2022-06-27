import { MouseEvent, MouseEventHandler, PropsWithChildren, ReactElement, useCallback, useState, useMemo } from 'react'

import { TableInstance } from 'react-table'

import { ToolbarStyled, LeftIconsSection, RightIconsSection, Divider } from '../Components/BaseToolbar';
import Count from '../Components/Count';
import Search from '../Components/Search';

import { TableMouseEventHandler } from '../../types/react-table-config'
import { ColumnHidePage } from './ColumnHidePage'
import { FilterPage } from './FilterPage'

import { ReactComponent as FavoriteIcon } from '../Icons/Star.svg';
import { ReactComponent as DeleteIcon } from '../Icons/Trash.svg';
import { ReactComponent as CopyIcon } from '../Icons/Copy.svg';
import { ReactComponent as ColumnIcon } from '../Icons/Hamburger.svg';
import { ReactComponent as FilterIcon } from '../Icons/Filter.svg';

import { cx } from '@emotion/css'
import { toolbarColumn, toolbarButton, toolbarCounter, favoriteWrapper } from './styles';


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
  enabled = () => true,
}: InstanceActionButton<T>): ReactElement => {
  return (
    <>
      {/* todo: add Tooltip  */}
      {/* <Tooltip title={label} aria-label={label}> */}
      <span>
        <button
          className={toolbarButton}
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
  enabled = true,
}: ActionButton): ReactElement => {
  return (
    <>
      {/* todo: add Tooltip  */}
      {/* <Tooltip title={label} aria-label={label}> */}
      <button
        className={toolbarButton}
        onClick={onClick}
        disabled={!enabled}
      >
        {icon}
      </button>
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
  const { columns, state: { filters } } = instance
  const [anchorEl, setAnchorEl] = useState<Element | undefined>(undefined)
  const [columnsOpen, setColumnsOpen] = useState(false)
  const [filterOpen, setFilterOpen] = useState(false)
  const hideableColumns = columns.filter((column) => !(column.id === '_selector'));
  const visibileColumnsCount = columns.filter((column) => column.isVisible).length;
  const appliedFilterCount = useMemo(() => {
    let count = 0;
    filters.forEach((filter) => {
      for (let key in filter.value) {
        count += (filter.value[key] === true ? 1 : 0);
      }
    });
    return count;
  }, [filters]);

  const columnFilterActive = visibileColumnsCount < columns.length;
  const filtersActive = appliedFilterCount > 0;

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
  }, []);

  return (
    <ToolbarStyled>
      <LeftIconsSection>
        <Search instance={instance} />

        <SmallIconActionButton
          icon={
            <span className={cx(toolbarColumn, filtersActive ? 'active': '')}>
            <FilterIcon />
            {
              filtersActive && 
              <span className={cx(toolbarCounter, filtersActive ? 'active': '')}><Count count={`${appliedFilterCount}`} /></span>
            }
          </span>
          }
          onClick={handleFilterClick}
          label="Filter by columnsFilter by columnsFilter by columnsFilter by columnsFilter by columns"
          variant="right"
        />

        {/* // favorite  */}
        <span className={favoriteWrapper}>
          <Count icon={<FavoriteIcon />} count={`${0}`} />
        </span>

        <Divider />

        {onEdit && (
          <InstanceSmallIconActionButton<T>
            instance={instance}
            icon={<CopyIcon />}
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
            icon={<DeleteIcon />}
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
          <SmallIconActionButton
            icon={
              <span className={cx(toolbarColumn, columnFilterActive ? 'active': '')}>
                <ColumnIcon />
                {
                  columnFilterActive && 
                  <span className={cx(toolbarCounter, columnFilterActive ? 'active': '')}><Count count={`${visibileColumnsCount}/${columns.length}`} /></span>
                }
              </span>
            }
            onClick={handleColumnsClick}
            label="Show / hide columns"
            variant="right"
          />
        )}
      </RightIconsSection>
    </ToolbarStyled >
  )
}
