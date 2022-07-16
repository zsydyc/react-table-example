import { PropsWithChildren, ReactElement } from 'react';
import { TableInstance } from 'react-table'

import { paginationWrapper, paginationPageSelect, paginationPageNavigation } from './styles'

function TablePagination<T extends Record<string, unknown>>({
  instance,
  typeDescriptor,
}: PropsWithChildren<{ instance: TableInstance<T>, typeDescriptor: string }>): ReactElement | null {
  const {
    state: { pageIndex, pageSize, rowCount = instance.rows.length },
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    canPreviousPage,
    canNextPage,
    pageCount,
    pageOptions,
    state: { selectedRowIds },
  } = instance;

  const selectedRowLength = Object.keys(selectedRowIds).length;


  return (
    <div className={paginationWrapper}>
      <div>{ selectedRowLength } {typeDescriptor.toLowerCase()}{selectedRowLength > 1 && 's'} selected</div>
      <div>
        <span className={paginationPageSelect}>
          {typeDescriptor} per page
          <select
            value={pageSize}
            onChange={e => {
              setPageSize(Number(e.target.value))
            }}
          >
            {[10, 20, 30, 40, 50].map(pageSize => (
              <option key={pageSize} value={pageSize}>
                {pageSize}
              </option>
            ))}
        </select>
        </span>

        <span className={paginationPageNavigation}>
          {/*
          <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
            {'<<'}
          </button>
            */}
          <button onClick={() => previousPage()} disabled={!canPreviousPage}>
            {'<'}
          </button>
          <button onClick={() => nextPage()} disabled={!canNextPage}>
            {'>'}
          </button>
          {/*
          <button onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
            {'>>'}
          </button>
          */}
        </span>
        <span>
            {pageIndex + 1} - {pageOptions.length} of {pageCount * pageSize}
        </span>
      </div>
    </div>
  );
}

export { TablePagination };
