import { Popover } from '@material-ui/core'
import { FormEvent, ReactElement, useCallback } from 'react'
import { TableInstance } from 'react-table'
import { cx } from '@emotion/css'
import { filterResetButton, menuTitle, contextMenu, columnsPopOver, filterSection } from './styles';


type FilterPageProps<T extends Record<string, unknown>> = {
  instance: TableInstance<T>
  anchorEl?: Element
  onClose: () => void
  show: boolean
}

export function FilterPage<T extends Record<string, unknown>>({
  instance,
  anchorEl,
  onClose,
  show,
}: FilterPageProps<T>): ReactElement {
  const { allColumns, setAllFilters } = instance

  const onSubmit = useCallback(
    (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault()
      onClose()
    },
    [onClose]
  )

  const resetFilters = useCallback(() => {
    setAllFilters([]);
    onClose();
  }, [setAllFilters])

  return (
    <div>
      <Popover
        anchorEl={anchorEl}
        id={'popover-filters'}
        onClose={onClose}
        open={show}
        className={columnsPopOver}
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
          <span className={menuTitle}>Filters</span>
          <form onSubmit={onSubmit}>
            <div>
              {allColumns
                .filter((it) => it.canFilter)
                .map((column) => (
                  <div key={column.id} className={filterSection}>
                    {column.render('Filter')}
                  </div>
                ))}
            </div>
            <button className={filterResetButton} onClick={resetFilters}>
              Reset
            </button>
          </form>
        </div>
      </Popover>
    </div>
  )
}
