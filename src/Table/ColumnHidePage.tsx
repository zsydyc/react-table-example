// todo: replace Popover
import { Popover } from '@material-ui/core' 
import { ReactElement } from 'react'
import { TableInstance } from 'react-table'

import { cx } from '@emotion/css'
import { columnsPopOver, menuTitle, contextMenu, menuOptionsWrapper } from './styles';


type ColumnHidePageProps<T extends Record<string, unknown>> = {
  instance: TableInstance<T>
  anchorEl?: Element
  onClose: () => void
  show: boolean
}

const id = 'popover-column-hide';

export function ColumnHidePage<T extends Record<string, unknown>>({
  instance,
  anchorEl,
  onClose,
  show,
}: ColumnHidePageProps<T>): ReactElement | null {
  const { allColumns, toggleHideColumn } = instance
  const hideableColumns = allColumns.filter((column) => !(column.id === '_selector'))
  const checkedCount = hideableColumns.reduce((acc, val) => acc + (val.isVisible ? 0 : 1), 0)

  const onlyOneOptionLeft = checkedCount + 1 >= hideableColumns.length

  return hideableColumns.length > 1 ? (
    <Popover
      anchorEl={anchorEl}
      className={columnsPopOver}
      id={id}
      onClose={onClose}
      open={show}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'right',
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
    >
      <div className={cx(columnsPopOver, contextMenu)}>
        <span className={menuTitle}>Columns</span>
        <ul className={menuOptionsWrapper}>
          {hideableColumns.map((column) => (
            <li key={column.id}>
              <input type="checkbox" value={`${column.id}`} id={`${column.id}`} checked={column.isVisible} onChange={() => toggleHideColumn(column.id, column.isVisible)} disabled={column.isVisible && onlyOneOptionLeft} />
              <label htmlFor={`${column.id}`}>{column.render('Header')}</label>
            </li>
          ))}
        </ul>
      </div>
    </Popover>
  ) : null
}
