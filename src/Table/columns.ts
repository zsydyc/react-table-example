import {CellProps} from "react-table"

import {ExperimentData, ExperimentStatus, ExperimentType, RunData } from "../utils"

import {CheckboxColumnFilter} from "./filters/Filters";

import { ReactComponent as FavoriteIcon  } from '../Icons/Star.svg';
import { FavoriteCell } from "./FavoriteCell";

export enum ColumnIds {
  favorite = "favorite"
}

export const experimentColumns = [
  {
    Header: 'Name',
    columns: [
      {
        Header: FavoriteIcon,
        accessor: ColumnIds.favorite,
        Cell: FavoriteCell,
        filter: 'weakEquals',
        aggregate: 'count',
        width: 50,
        minWidth: 50,
        disableFilters: true,
        disableSortBy: true,
      },
      {
        Header: 'Name',
        accessor: 'name',
        aggregate: 'count',
        filter: 'fuzzyText',
        disableFilters: true,
        width: 200,
        maxWidth: 500,
      },
      {
        Header: 'Type',
        accessor: 'type',
        Filter: CheckboxColumnFilter,
        filter: 'enumMatch',
        enumType: ExperimentType,
      },
      {
        Header: 'Status',
        accessor: 'status',
        Filter: CheckboxColumnFilter,
        filter: 'enumMatch',
        enumType: ExperimentStatus,
      },
    ],
  },
  {
    Header: 'Info',
    columns: [
      {
        Header: 'Description',
        accessor: 'description',
        align: 'left',
        filter: 'fuzzyText',
        disableGroupBy: true,
        defaultCanSort: false,
        disableSortBy: false,
        disableFilters: true,
        Aggregated: ({ cell: { value } }: CellProps<ExperimentData>) => `${value} Descriptions`,
        minWidth: 340,
      },
      {
        Header: 'Modified On',
        accessor: 'modifiedOn',
        disableFilters: true,
      },
      {
        Header: 'Modified By',
        accessor: 'modifiedBy',
        // filter: 'fuzzyText',
        disableFilters: true,
      },
      {
        Header: 'Created On',
        accessor: 'createdOn',
        disableFilters: true,
      },
      {
        Header: 'Created By',
        accessor: 'createdBy',
        // filter: 'fuzzyText',
        disableFilters: true,
      },
    ],
  },
]
// Drop Header Groups
.flatMap((c:any)=>c.columns)

export const runColumns = [
  {
    Header: 'Name',
    columns: [
      // hide favorite column
      // {
      //   Header: '',
      //   accessor: 'favorite',
      //   aggregate: 'count',
      //   width: 50,
      //   minWidth: 50,
      //   disableFilters: true,
      //   disableSortBy: true,
      // },
      {
        Header: 'Name',
        accessor: 'name',
        aggregate: 'count',
        filter: 'fuzzyText',
        disableFilters: true,
        width: 200,
        maxWidth: 500,
      },
      {
        Header: 'Id',
        accessor: 'id',
        Filter: 'fuzzyText',
        filter: 'enumMatch',
        disableFilters: true,
      },
    ],
  },
  {
    Header: 'Info',
    columns: [
      {
        Header: 'Description',
        accessor: 'description',
        align: 'left',
        filter: 'fuzzyText',
        disableGroupBy: true,
        defaultCanSort: false,
        disableSortBy: false,
        disableFilters: true,
        Aggregated: ({ cell: { value } }: CellProps<RunData>) => `${value} Descriptions`,
        minWidth: 340,
      },
      {
        Header: 'val_Acc (Minimum)',
        accessor: 'valMin',
        disableFilters: true,
      },
      {
        Header: 'val_acc (Maximum)',
        accessor: 'valMax',
        disableFilters: true,
      },
    ],
  },
]
// Drop Header Groups
.flatMap((c:any)=>c.columns)
