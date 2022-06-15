import { CssBaseline } from '@material-ui/core'
import React, { useCallback } from 'react'
import { CellProps, TableInstance } from 'react-table'

import { Page } from './Page'
import { Table } from './Table'
import { ExperimentData, makeData } from './utils'

import columns from './Table/columns'


const App: React.FC = () => {
  const [data] = React.useState<ExperimentData[]>(() => makeData(100))

  const dummy = useCallback(
    (instance: TableInstance<ExperimentData>) => () => {
      console.log(
        'Selected',
        instance.selectedFlatRows.map((v) => `'${v.original.name}'`).join(', ')
      )
    },
    []
  )

  return (
    <Page>
      <CssBaseline />
      <Table<ExperimentData>
        name={'Experiments'}
        columns={columns}
        data={data}
        onAdd={dummy}
        onEdit={dummy}
        onDelete={dummy}
      />
    </Page>
  )
}

export default App
