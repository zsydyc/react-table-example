import { useState, PropsWithChildren, ReactElement, useEffect } from 'react';

import { TableInstance } from 'react-table';

import ContextMenu from "./ContextMenu";
import { cx } from '@emotion/css';
import { tableRow } from './styles';


function TableBody<T extends Record<string, unknown>>({
  instance,
}: PropsWithChildren<{ instance: TableInstance<T> }>): ReactElement | null {

  const {
    page, prepareRow,
  } = instance;

    // todo: since some table doesn't need to show context menu may need a flag (boolean) to control table show/hide
  const [showContextMenu, setShowChotextMenu] = useState(false);
  const [contextMenuPosition, setContentMenuPosition] = useState({x: 0, y: 0});
  const [selectRowName, setSelectRowName] = useState('');

  const handleContextMenu = (e: React.MouseEvent<HTMLTableRowElement, MouseEvent>, name: string, status: string) => {
    e.preventDefault();
    setContentMenuPosition({x: e.pageX, y: e.pageY});
    setSelectRowName(name);
    setShowChotextMenu(true);
  }

  const handleClickOutside = () => {
    setContentMenuPosition({x:0, y: 0});
    setSelectRowName('');
    setShowChotextMenu(false);
  }

  useEffect(() => {
    // Bind the event listener
    document.addEventListener('click', handleClickOutside);

    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener('click', handleClickOutside);
    };
  });

  // todo: may need to pass an options object for different type of table (e.g. Exp Table / Run Table)

  const contextMenuOptions = { 'showFavorite': true };

  return (
    <>
      <tbody>
        {page.map((row) => {
          prepareRow(row);
          const { key: rowKey, role: rowRole, ...getRowProps } = row.getRowProps();
          return (
            <tr
              key={rowKey}
              data-name={row.original.name}
              data-status={row.original.stauts}
              onContextMenu={(e)=>handleContextMenu(e, row.original.name as string, row.original.stauts as string )}
              {...getRowProps}
              className={cx(
                { 'rowSelected': row.isSelected }, tableRow
              )}
            >
              {row.cells.map((cell) => {
                const { key: cellKey, role: cellRole, ...getCellProps } = cell.getCellProps()
                return (
                  <td key={cellKey} {...getCellProps} >
                    {/* todo: clean up this, add grouping support,  */}
                    {/* todo: remove MUI dependency 
                    // import KeyboardArrowUp from '@material-ui/icons/KeyboardArrowUp'
                    // import { TableSortLabel } from '@material-ui/core' */}
                    {/* {cell.isGrouped ? (
                      <>
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
                    )} */}
                    {cell.render('Cell')}
                  </td>
                )
              })}
            </tr>
          )
        })}
      </tbody>
      {showContextMenu && <ContextMenu position={contextMenuPosition} rowName={selectRowName} options={contextMenuOptions} />}
    </>
  );

}


export { TableBody };
