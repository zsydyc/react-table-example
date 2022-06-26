# React Table Example

This demo is forked from : [https://github.com/ggascoigne/react-table-example](https://github.com/ggascoigne/react-table-example)

Demo of React Table V7 using TypeScript as well as Material UI

- `yarn` and `yarn start` to run and edit the example

This example uses:
  * `useGroupBy` to enable header groups
  * `useFilters` for per-column filters.  Note that filters are displayed in a separate filter dropdown rather than being embedded in each column header.
  * `useSortBy` for column sorting
  * `useExpanded` to allow expansion of grouped columns
  * `useFlexLayout` for a scalable full width table
  * `usePagination` for pagination
  * `useResizeColumns` for resizable columns
  * `useRowSelect` for row selection
  
Other features:
  * Demonstrates hiding columns.
  * use `react-json-view` to optionally display the table instance for better exploration.
  * use `useLocalStorage` and `useDebounce`, both from https://usehooks.com  to persist table settings.

  

## Cleanup I did:

 - Remove `makeStyles` calls from MUI and replace it with emotion 
 - The following pages has been done:
    - TooltipCell.tsx
    - TablePagination.tsx (Removed MUI pagination, re-write)
    - ResizeHandle.tsx
    - Table.tsx (50%)
    - TableStyles.tsx (50% done, need to clean `styled`)


## Todo:

 - Clean up `styled` from `@material-ui/core` (TableStyles.tsx)
 - Remove the dependency from MUI, find the alternatives for the following:
    - MUI icons

 - The current example is using MUI 4, if we have to use MUI components (e.g. Popover), we need to upgrade to MUI 5.



