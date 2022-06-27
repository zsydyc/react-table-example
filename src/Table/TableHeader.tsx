import { PropsWithChildren, ReactElement } from 'react';

import {
  TableInstance,
} from 'react-table';
import { ResizeHandle } from './ResizeHandle';
import { tableHeadRow } from './styles';
import { ReactComponent as UpIcon  } from '../Icons/Caret_up.svg';
import { ReactComponent as DownIcon  } from '../Icons/Caret_down.svg';

function TableHeader<T extends Record<string, unknown>>({
  instance,
}: PropsWithChildren<{ instance: TableInstance<T> }>): ReactElement | null {
  const {
    headerGroups
  } = instance;

  return (
    <thead className={tableHeadRow}>
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
                    <span onClick={onClick} className={'sortable'}>
                      {column.render('Header')} 
                      {column.isSorted ? (column.isSortedDesc ? <DownIcon/> : <UpIcon/>): null }
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