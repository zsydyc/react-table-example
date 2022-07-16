import React from 'react'
import { CellProps } from 'react-table'

import styled from '@emotion/styled'

import {SmallIconActionButton} from './TableToolbar';
import { ReactComponent as FavoriteIcon } from '../Icons/Star.svg';
import {useTableContext} from './TableContext';

type WithActiveStatus = {
  active: boolean | undefined;
}

const FavoriteIconStyled = styled(FavoriteIcon)<WithActiveStatus>`
  opacity: 0.3;
  ${props => props.active ? `opacity: 100;`: ''}

  &:hover {
    opacity: 0.6
  }
`

export const FavoriteCell: React.FC<CellProps<any>> = ({ cell, row: { index },  }) => {
  const { updateDataRow } = useTableContext()

  const updatedValue = {
    ...cell.row.original,
    favorite: !cell.row.original.favorite
  }

  return (
    <SmallIconActionButton
      icon={<FavoriteIconStyled active={cell.value} />}
      label="Favorite"
      onClick={() => {
        console.log(cell.row.original)
        updateDataRow?.(index, updatedValue)
      }}
    />
  )
}
