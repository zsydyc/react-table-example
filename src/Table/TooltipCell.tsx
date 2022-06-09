// todo: need to replace MUI tooltip
import { Tooltip as MuiTooltip } from '@material-ui/core'
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
  tooltip?: string
  align: string
}

export const TooltipCell: React.FC<TooltipProps> = ({ text, tooltip = text, align }) => {
  return (
    <MuiTooltip title={tooltip} className={truncated} style={{ textAlign: align } as CSSProperties}>
      <span>{text}</span>
    </MuiTooltip>
  )
}
