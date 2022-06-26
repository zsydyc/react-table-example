import { PropsWithChildren, ReactElement } from 'react';

import {
  TableInstance,
} from 'react-table';
import { ResizeHandle } from './ResizeHandle'

function TableHeader<T extends Record<string, unknown>>({
  instance,
}: PropsWithChildren<{ instance: TableInstance<T> }>): ReactElement | null {
  const {
    headerGroups
  } = instance;

  return (
    <thead>
      {headerGroups.map((headerGroup) => {
        const {
          key: headerGroupKey,
          title: headerGroupTitle,
          role: headerGroupRole,
          ...getHeaderGroupProps
        } = headerGroup.getHeaderGroupProps()
        return (
          <tr key={headerGroupKey} {...getHeaderGroupProps}>
            {headerGroup.headers.map((column) => {

              const { key: headerKey, role: headerRole, ...getHeaderProps } = column.getHeaderProps();

              const { onClick } = column.getSortByToggleProps();

              return (
                <td key={headerKey} {...getHeaderProps}>
                  {column.canSort ? (
                    <span onClick={onClick}>
                      {column.render('Header')} 
                      {/* todo: replace this by icon  */}
                      {column.isSorted && <span> {column.isSortedDesc ? 'desc' : 'asc'}</span> }
                    </span>
                    
                  ) : (
                    <span>{column.render('Header')}</span>
                  )}

                  {column.canResize && <ResizeHandle column={column} />}
                </td>
              )
            })}
          </tr>
        )
      })}
    </thead>
  );
}

export { TableHeader };