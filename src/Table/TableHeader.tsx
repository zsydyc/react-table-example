import { useEffect, useState, useCallback, PropsWithChildren, ReactElement, useRef } from 'react';

// todo: replace tooltip with popup component from Bloom
import { Tooltip, TableSortLabel } from '@material-ui/core'

import {
  TableInstance,
} from 'react-table';
import { ResizeHandle } from './ResizeHandle'


// todo: clean this
import {
  TableLabel,
} from './TableStyles'

import { css } from '@emotion/css'

const tableSortLabel = css`
    & svg {
      width: 16px;
      height: 16px;
      margin-top: 0px;
      margin-left: 2px;
    }
`;

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

              const { key: headerKey, role: headerRole, ...getHeaderProps } = column.getHeaderProps()
              const { title: sortTitle = '', ...columnSortByProps } = column.getSortByToggleProps()

              return (
                <td key={headerKey} {...getHeaderProps}>
                  {column.canSort ? (
                    <Tooltip title={sortTitle}>
                      <TableSortLabel
                        active={column.isSorted}
                        direction={column.isSortedDesc ? 'desc' : 'asc'}
                        {...columnSortByProps}
                        className={tableSortLabel}
                      >
                        {column.render('Header')}
                      </TableSortLabel>
                    </Tooltip>
                  ) : (
                    <TableLabel>{column.render('Header')}</TableLabel>
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