import { FilterValue, IdType, Row } from 'react-table'

export function enumMatchFilter<T extends Record<string, unknown>>(
  rows: Array<Row<T>>,
  id: Array<IdType<T>>,
  filterValue: FilterValue
): Array<Row<T>> {
  return rows.filter(row =>
    row.values[id[0]] in filterValue
  );
}

// Let the table remove the filter if the string is empty
// enumMatchFilter.autoRemove = (val: any) => !val
