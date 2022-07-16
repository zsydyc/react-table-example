import React, { useState, useCallback, useEffect } from 'react'
import { TableInstance } from 'react-table'

import { Page } from './Page'
import { Table } from './Table'
import { ExperimentData, makeExpData, RunData, makeRunData, } from './utils'

import { experimentColumns, runColumns } from './Table/columns'
import { TableProvider } from './Table/TableContext'

const App: React.FC = () => {
  const dummyExpAction = useCallback(
    (instance: TableInstance<ExperimentData>) => () => {
      console.log(
        'Selected',
        instance.selectedFlatRows.map((v) => `'${v.original.name}'`).join(', ')
      )
    },
    []
  )

  const dummyRunAction= useCallback(
    (instance: TableInstance<RunData>) => () => {
      console.log(
        'Selected',
        instance.selectedFlatRows.map((v) => `'${v.original.name}'`).join(', ')
      )
    },
    []
  )

  return (
    <Page>
      <TableProvider apiCall={makeExpData}>
        <Table<ExperimentData>
          name={'Experiments'}
          columns={experimentColumns}
          onAdd={dummyExpAction}
          onEdit={dummyExpAction}
          onDelete={dummyExpAction}
        />
      </TableProvider>

      {/*
        <Table<ExperimentData>
          name={'Experiments'}
          data={makeExpData(100)}
          columns={experimentColumns}
          onAdd={dummyExpAction}
          onEdit={dummyExpAction}
          onDelete={dummyExpAction}
        />
        */}

      {/*
      <TableProvider<RunData> apiCall={makeRunData}>
        <Table<RunData>
          name={'Runs'}
          columns={runColumns}
          onAdd={dummyRunAction}
          onEdit={dummyRunAction}
          onDelete={dummyRunAction}
        />
      </TableProvider>
        */}
    </Page>
  )
}

export default App
