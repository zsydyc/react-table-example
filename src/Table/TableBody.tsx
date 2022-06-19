import {  useState, PropsWithChildren, ReactElement } from 'react';
import KeyboardArrowUp from '@material-ui/icons/KeyboardArrowUp'
import { TableSortLabel } from '@material-ui/core'
import {
  TableInstance,
} from 'react-table';

import ContextMenu from "./ContextMenu";
import { cx, css } from '@emotion/css'

const iconDirectionAsc = css`
  transform: rotate(90deg);
`;
const iconDirectionDesc = css`
  transform: rotate(180deg);
`;
const cellIcon = css`
  & svg {
    width: 16px;
    height: 16px;
    margin-top: 3px;
  }
`;

const tableBodyStyle = css`
  td {
    display: flex;
  }
`;


function TableBody<T extends Record<string, unknown>>({
  instance,
}: PropsWithChildren<{ instance: TableInstance<T> }>): ReactElement | null {

  const {
    page, prepareRow,
  } = instance;

  const [contextMenuPosition, setContentMenuPosition] = useState({x: 0, y: 0});
  const [selectRowName, setSelectRowName] = useState('');

  const handleContextMenu = (e: React.MouseEvent<HTMLTableRowElement, MouseEvent>, name: string, status: string) => {
    e.preventDefault();
    setContentMenuPosition({x:  e.pageX,y: e.pageY});
    setSelectRowName(name);
  }

  // todo: may need options for different type of table
  const contextMenuOptions = { 'showFavorite': true };


  return (
    <>
      <tbody className={tableBodyStyle}>
        {page.map((row) => {
          prepareRow(row);
          const { key: rowKey, role: rowRole, ...getRowProps } = row.getRowProps();
          return (
            <tr
              key={rowKey}
              data-name={row.original.name}
              data-status={row.original.stauts}
              // ref={tableRowRef}
              onContextMenu={(e)=>handleContextMenu(e, row.original.name as string, row.original.stauts as string )}
              {...getRowProps}
              className={cx(
                { 'rowSelected': row.isSelected }
              )}
            >
              {row.cells.map((cell) => {
                const { key: cellKey, role: cellRole, ...getCellProps } = cell.getCellProps()
                return (
                  <td key={cellKey} {...getCellProps} >
                    {cell.isGrouped ? (
                      <>
                        {/* todo: clean up this, remove mui dependency  */}
                        <TableSortLabel
                          classes={{
                            iconDirectionAsc: iconDirectionAsc,
                            iconDirectionDesc: iconDirectionDesc,
                          }}
                          active
                          direction={row.isExpanded ? 'desc' : 'asc'}
                          IconComponent={KeyboardArrowUp}
                          {...row.getToggleRowExpandedProps()}
                          className={cellIcon}
                        />{' '}
                        {cell.render('Cell', { editable: false })} ({row.subRows.length})
                      </>
                    ) : cell.isAggregated ? (
                      cell.render('Aggregated')
                    ) : cell.isPlaceholder ? null : (
                      cell.render('Cell')
                    )}
                  </td>
                )
              })}
            </tr>
          )
        })}
      </tbody>
      <ContextMenu position={contextMenuPosition} rowName={selectRowName} options={contextMenuOptions} />
    </>
  );

}


export { TableBody };