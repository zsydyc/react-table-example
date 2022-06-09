import { Checkbox, styled } from '@material-ui/core'
import MuiTableTable from '@material-ui/core/Table'
import { TableTypeMap } from '@material-ui/core/Table/Table'
import MuiTableBody from '@material-ui/core/TableBody'
import { TableBodyTypeMap } from '@material-ui/core/TableBody/TableBody'
import MuiTableCell from '@material-ui/core/TableCell'
import { TableCellProps } from '@material-ui/core/TableCell/TableCell'
import MuiTableHead from '@material-ui/core/TableHead'
import { TableHeadTypeMap } from '@material-ui/core/TableHead/TableHead'
import MuiTableRow from '@material-ui/core/TableRow'
import { TableRowTypeMap } from '@material-ui/core/TableRow/TableRow'

import React, { CSSProperties } from 'react'

import { cx, css } from '@emotion/css'

const tableTable = css`
  border-spacing: 0,
  border: 1px solid rgba(224, 224, 224, 1),
  width: 100%;
`;
const tableHead = css``;

const tableHeadRow = css`
  background-color: white;
  color: black;
  border-bottom: 1px solid rgba(224, 224, 224, 1);
  &:hover $resizeHandle{
    opacity: 1;
  }
`;

const tableHeadCell = css`
  padding: 16px 1px 16px 16px;
  font-size: 0.875rem;
  text-align: left;
  vertical-align: inherit;
  color: black;
  font-weight: 500;
  line-height: 1.5rem;
  border-right: 1px solid rgba(224, 224, 224, 1);
  &:last-child{
    border-right: none;
  }
`;
const tableBody = css``;

const tableRow = css`
  color: inherit;
  outline: 0;
  vertical-align: middle;
  &:hover{
    background-color: rgba(0, 0, 0, 0.07);
  }
  border-bottom: 1px solid rgba(224, 224, 224, 1);
  &:last-child{
    border-bottom: none;
  }
  &.rowSelected{
    background-color: rgba(0, 0, 0, 0.04);
    &:hover{
      background-color: rgba(0, 0, 0, 0.07);
    }
  }
  &:active{
    cursor: pointer;
  }
`
const tableLabel = css``;
const tableCell = css`
  padding: 8px 16px;
  font-size: 0.875rem;
  text-align: left;
  font-weight: 300;
  line-height: 1.3;
  vertical-align: inherit;
  color: black;
  border-right: 1px solid rgba(224, 224, 224, 1);
  &:last-child{
    border-right: none;
  }
`;

const areEqual = (prevProps: any, nextProps: any) =>
  prevProps.checked === nextProps.checked && prevProps.indeterminate === nextProps.indeterminate

type CN = { className?: string; style?: CSSProperties }

export const TableTable: React.FC<Partial<TableTypeMap> & CN> = ({ children, className, ...rest }) => {
  return (
    <MuiTableTable className={cx(className, tableTable)} {...rest}>
      {children}
    </MuiTableTable>
  )
}

export const TableBody: React.FC<Partial<TableBodyTypeMap> & CN> = ({ children, className, ...rest }) => {
  return (
    <MuiTableBody className={cx(className, tableBody)} {...rest}>
      {children}
    </MuiTableBody>
  )
}

export const TableHead: React.FC<Partial<TableHeadTypeMap> & CN> = ({ children, className, ...rest }) => {
  return (
    <MuiTableHead className={cx(className, tableHead)} {...rest}>
      {children}
    </MuiTableHead>
  )
}

export const TableHeadRow: React.FC<Partial<TableRowTypeMap> & CN> = ({ children, className, ...rest }) => {
  return (
    <MuiTableRow className={cx(className, tableHeadRow)} {...rest}>
      {children}
    </MuiTableRow>
  )
}

export const TableHeadCell: React.FC<Partial<TableCellProps> & CN> = ({ children, className, ...rest }) => {
  return (
    <MuiTableCell className={cx(className, tableHeadCell)} {...rest}>
      {children}
    </MuiTableCell>
  )
}

export const TableRow: React.FC<Partial<TableRowTypeMap> & CN> = ({ children, className, ...rest }) => {
  return (
    <MuiTableRow className={cx(className, tableRow)} {...rest}>
      {children}
    </MuiTableRow>
  )
}

export const TableCell: React.FC<Partial<TableCellProps> & CN> = ({ children, className, ...rest }) => {
  return (
    <MuiTableCell className={cx(className, tableCell)} {...rest}>
      {children}
    </MuiTableCell>
  )
}

export const TableLabel: React.FC<CN> = ({ children, className, ...rest }) => {
  return (
    <div className={cx(className, tableLabel)} {...rest}>
      {children}
    </div>
  )
}

export const HeaderCheckbox = React.memo(
  styled(Checkbox)({
    fontSize: '1rem',
    margin: '-8px 0 -8px -15px',
    padding: '8px 9px',
    '& svg': {
      width: '24px',
      height: '24px',
    },
    '&:hover': {
      backgroundColor: 'transparent',
    },
  }),
  areEqual
)

export const RowCheckbox = React.memo(
  styled(Checkbox)({
    fontSize: '14px',
    margin: '-9px 0 -8px -15px',
    padding: '5px 9px',
    '&:hover': {
      backgroundColor: 'transparent',
    },
    '& svg': {
      width: 24,
      height: 24,
    },
  }),
  areEqual
)
