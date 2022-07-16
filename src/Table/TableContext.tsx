import React, { useState, useEffect, useCallback, SetStateAction, Dispatch } from 'react'

import { LoadingStatus, GenericApiType, ApiCall, useApiMockCall, makeData } from '../utils'

const apiPageCount = 100; // This is the limit from the BackEnd
// https://docs.aws.amazon.com/sagemaker/latest/APIReference/API_Search.html#API_Search_RequestSyntax

const maxLazyLoadCount = 300;

// This is the number of records in the table
const numRecords = 700;

interface TableContextValue {
  loadingStatus: LoadingStatus;
  apiCall: makeData<GenericApiType> | undefined;
  data: GenericApiType[],
  setSearchResults: Dispatch<SetStateAction<GenericApiType[]>> | undefined
  setIsSearchLoading: Dispatch<SetStateAction<boolean>> | undefined
  usesSearchApi: boolean,
  isSearchLoading: boolean,
  nextToken: string | undefined,
  updateDataRow: undefined | ((index:number, updatedValue: GenericApiType) => void)
}

interface TableProviderProps {
  children: React.ReactNode;
  apiCall: makeData<GenericApiType>;
}

export const TableContext = React.createContext<TableContextValue>({
  loadingStatus: LoadingStatus.loadingInitial,
  apiCall: undefined,
  data: [],
  setSearchResults: undefined,
  setIsSearchLoading: undefined,
  usesSearchApi: false,
  isSearchLoading: false,
  nextToken: undefined,
  updateDataRow: undefined,
})

export const TableProvider = ({ children, apiCall }: TableProviderProps) => {
  const [loadingStatus, setLoadingStatus] = useState<LoadingStatus>(LoadingStatus.loadingInitial)
  const [isSearchLoading, setIsSearchLoading] = useState(false)

  const [data, setData] = useState<GenericApiType[]>([])
  const [searchResults, setSearchResults] = useState<GenericApiType[]>([])

  const updateDataRow = (index: number, updatedValue: GenericApiType) => {
    const newData = [...data];
    data[index] = updatedValue;

    setData(newData)
  }

  const shouldHaveNextToken = data.length < numRecords

  const {
    Results,
    isLoaded,
    NextToken: nextToken,
    fetchData,
  } = useApiMockCall(apiCall, apiPageCount, shouldHaveNextToken)

  const [usesSearchApi, setUsesSearchApi] = useState(false)

  useEffect(() => {
    const newData = [...data, ...Results]
    setData(newData)
  }, [Results])

  useEffect(() => {
    if (isLoaded) {
      if (data.length >= maxLazyLoadCount && nextToken) {
        setLoadingStatus(LoadingStatus.backendHasMore)
        setUsesSearchApi(true)
      } else {
        setLoadingStatus(LoadingStatus.lazyLoaded)
      }
    } else if (loadingStatus != LoadingStatus.loadingInitial) {
      setLoadingStatus(LoadingStatus.lazyLoading)
    }
  }, [isLoaded])

  // lazy load data
  useEffect(() => {
    if (isLoaded && nextToken && data.length < maxLazyLoadCount) fetchData()
  }, [isLoaded, data])

  const contextValue = {
    loadingStatus,
    apiCall,
    data: searchResults.length > 0 ? searchResults : data,
    setSearchResults: setSearchResults as Dispatch<SetStateAction<GenericApiType[]>>,
    usesSearchApi,
    isSearchLoading,
    setIsSearchLoading,
    nextToken,
    updateDataRow
  }

  return (
    <TableContext.Provider value={contextValue}>
      <p>Debugging info | numRecords: {numRecords} loadingStatus: {LoadingStatus[loadingStatus]}</p>
      <br />
      {children}
    </TableContext.Provider>
  )
}

export const useTableContext = (): TableContextValue => {
  // Require this type cast to make the api type generic
  const context = React.useContext<TableContextValue>(
    TableContext as unknown as React.Context<TableContextValue>
  )
  return context
}
