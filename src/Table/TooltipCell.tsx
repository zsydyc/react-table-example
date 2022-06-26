import React, { CSSProperties } from 'react'
import { CellProps } from 'react-table'

import { css } from '@emotion/css'

const truncated = css`
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
`;

export const TooltipCellRenderer: React.FC<CellProps<any>> = ({ cell: { value }, column: { align = 'left' } }) => (
  <TooltipCell text={value} align={align} />
)

interface TooltipProps {
  text: string
  tooltip?: string | boolean
  align: string
}

export const TooltipCell: React.FC<TooltipProps> = ({ text, tooltip = text, align }) => {
  return (
    <div className={truncated} style={{ textAlign: align } as CSSProperties}>
      {/* todo: since we are truncated data, may need to add tooltip  */}
      <span>{text}</span>
    </div>
  )
}
