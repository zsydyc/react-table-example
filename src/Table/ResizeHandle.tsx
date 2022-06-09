import { cx, css } from '@emotion/css'
import { ReactElement } from 'react'
import { ColumnInstance } from 'react-table'



const resizeHandleStyle = css`
  position: absolute;
  cursor: col-resize;
  z-index: 100;
  opacity: 0;
  border-left: 1px solid blue;
  border-right: 1px solid blue;
  height: 50%;
  top: 25%;
  transition: all linear 100ms;
  right: -2px;
  width: 3px;
  &.handleActive: {
    opacity: 1;
    border: none;
    background-color: blue;
    height: calc(100% - 4px);
    top: 2px;
    right: -1;
    width: 1;
  }
`;

export const ResizeHandle = <T extends Record<string, unknown>>({
  column,
}: {
  column: ColumnInstance<T>
}): ReactElement => {
  return (
    <div
      {...column.getResizerProps()}
      style={{ cursor: 'col-resize' }} // override the useResizeColumns default
      className={cx(
        {[resizeHandleStyle]: true, 'handleActive': column.isResizing,}
      )}
    />
  )
}
