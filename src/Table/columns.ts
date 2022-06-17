import {CellProps} from "react-table"

import {ExperimentData, ExperimentStatus, ExperimentType} from "../utils"

import {CheckboxColumnFilter} from "./filters/Filters"

const columns = [
  {
    Header: 'Name',
    columns: [
      {
        Header: 'Favorite',
        accessor: 'favorite',
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
        Aggregated: ({ cell: { value } }: CellProps<ExperimentData>) => `${value} Descriptions`,
      },
      {
        Header: 'Modified On',
        accessor: 'modifiedOn',
        disableFilters: true,
      },
      {
        Header: 'Modified By',
        accessor: 'modifiedBy',
        filter: 'fuzzyText',
      },
      {
        Header: 'Created On',
        accessor: 'createdOn',
        disableFilters: true,
      },
      {
        Header: 'Created By',
        accessor: 'createdBy',
        filter: 'fuzzyText',
      },
    ],
  },
]
// Drop Header Groups
.flatMap((c:any)=>c.columns)

export default columns
