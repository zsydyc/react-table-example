import { MouseEvent, MouseEventHandler, PropsWithChildren, ReactElement, useCallback, useState, useMemo, useEffect } from 'react'

import { TableInstance } from 'react-table'
import styled from '@emotion/styled'
import { TableMouseEventHandler } from '../../types/react-table-config'

import { ToolbarStyled, LeftIconsSection, RightIconsSection, Divider } from '../Components/BaseToolbar';
import Count from '../Components/Count';
import Search from '../Components/Search';

import { ColumnHidePage } from './ColumnHidePage'
import { FilterPage } from './FilterPage'

import { ReactComponent as FavoriteIcon } from '../Icons/Star.svg';
import { ReactComponent as DeleteIcon } from '../Icons/Trash.svg';
import { ReactComponent as CopyIcon } from '../Icons/Copy.svg';
import { ReactComponent as ColumnIcon } from '../Icons/Hamburger.svg';
import { ReactComponent as FilterIcon } from '../Icons/Filter.svg';

import {GenericApiType} from '../utils';
import {Tooltip} from '@material-ui/core';
import {favoritesFilterToggle} from './filters/Filters';


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

const ToolbarButton = styled.button`
  background:none;
  border:none;
  outline: none;

  cursor: pointer;

  display: flex;
  justify-content: center;
  align-items: center;

  &:disabled {
    opacity: 10%;
  }
`

export const InstanceSmallIconActionButton = <T extends Record<string, unknown>>({
  instance,
  icon,
  onClick,
  label,
  enabled = () => true,
}: InstanceActionButton<T>): ReactElement => {
  return (
    <Tooltip title={label} aria-label={label}>
      <ToolbarButton
        onClick={onClick(instance)}
        disabled={!enabled(instance)}
      >
        {icon}
      </ToolbarButton>
    </Tooltip>
  )
}

export const SmallIconActionButton = ({
  icon,
  onClick,
  label,
  enabled = true,
}: ActionButton): ReactElement => {
  return (
    <Tooltip title={label} aria-label={label}>
      <ToolbarButton
        onClick={onClick}
        disabled={!enabled}
      >
        {icon}
      </ToolbarButton>
    </Tooltip>
  )
}

// type TableToolbarProps<T extends Record<string, unknown>> = {
type TableToolbarProps<T extends GenericApiType> = {
  instance: TableInstance<T>
  onAdd?: TableMouseEventHandler
  onDelete?: TableMouseEventHandler
  onEdit?: TableMouseEventHandler
}

export function TableToolbar<T extends GenericApiType>({
  instance,
  onDelete,
  onEdit,
}: PropsWithChildren<TableToolbarProps<T>>): ReactElement | null {
  const { columns, state: { filters }, data } = instance

  const [anchorEl, setAnchorEl] = useState<Element | undefined>(undefined)
  const [columnsOpen, setColumnsOpen] = useState(false)
  const [filterOpen, setFilterOpen] = useState(false)
  const [filterFavorites, setFilterFavorites] = useState(false)
  const [favoritesCount, setFavoritesCount] = useState(0)

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

  useEffect(() => {
    setFavoritesCount(data.filter(it => it.favorite).length)
  }, [data])

  const columnFilterActive = visibileColumnsCount < columns.length;
  // const filtersActive = appliedFilterCount > 0;

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

  const handleFavoritesToggle = () => {
    setFilterFavorites(!filterFavorites)
    favoritesFilterToggle(instance)
  }

  return (
    <ToolbarStyled>
      <LeftIconsSection>
        <Search instance={instance} />

        <Count
          active={appliedFilterCount > 0}
          icon={<FilterIcon />}
          count={appliedFilterCount}
          onClick={handleFilterClick}
        />

        <Count
          active={filterFavorites}
          icon={<FavoriteIcon />}
          count={favoritesCount}
          onClick={handleFavoritesToggle}
        />

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
          <Count
            icon={<ColumnIcon />}
            tooltipLabel="Show / hide columns"
            active={columnFilterActive}
            count={columnFilterActive && (
              `${visibileColumnsCount}/${columns.length}`)}
            onClick={handleColumnsClick}
          />
        )}
      </RightIconsSection>
    </ToolbarStyled>
  )
}
