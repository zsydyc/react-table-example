import { Popover, createStyles, makeStyles } from '@material-ui/core'
import { FormEvent, ReactElement, useCallback } from 'react'
import { TableInstance } from 'react-table'

import { filterResetButton } from './TableStyles';

// todo: clean this style 
const useStyles = makeStyles(
  createStyles({
    columnsPopOver: {
      padding: 24,
    },
    grid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(2, 218px)',
      '@media (max-width: 600px)': {
        gridTemplateColumns: 'repeat(1, 180px)',
      },
      gridColumnGap: 24,
      gridRowGap: 24,
    },
    cell: {
      width: '100%',
      display: 'inline-flex',
      flexDirection: 'column',
    },
  })
)

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
  const classes = useStyles({})
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
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        <div className={classes.columnsPopOver}>
          <h2>Filters</h2>
          <form onSubmit={onSubmit}>
            
            <div className={classes.grid}>
              {allColumns
                .filter((it) => it.canFilter)
                .map((column) => (
                  <div key={column.id} className={classes.cell}>
                    {column.render('Filter')}
                  </div>
                ))}
            </div>
            <button className={filterResetButton}  onClick={resetFilters}>
              Reset
            </button>
          </form>
        </div>
      </Popover>
    </div>
  )
}
