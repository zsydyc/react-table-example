import { useEffect, useState } from 'react'
import {TableInstance} from 'react-table'
import styled from '@emotion/styled'

import { LoadingStatus, apiSearch, useDebounce, useApiMockCall, GenericApiType, apiMaxNum } from '../utils'

import { ReactComponent as SearchIcon  } from '../Icons/Magnifying_glass.svg';
import { ReactComponent as CloseIcon  } from '../Icons/X.svg';

import { useTableContext } from '../Table/TableContext'

interface SearchProps<ApiType extends GenericApiType> {
  instance: TableInstance<ApiType>, 
}

// Todo move this to tables folder since it requires the table instance

const SearchInput = styled.input`
  padding: 8px 16px;

  width: 220px;
  height: 32px;

  background: #1A1B22;

  border: 1px solid #6527B9;
  border-radius: 4px;

  color: white;
`

const Search = <ApiType extends GenericApiType>({ instance }: SearchProps<ApiType>) => {
  const { setGlobalFilter } = instance

  const [search, setSearch] = useState('')

  const { apiCall, setSearchResults, setIsSearchLoading, usesSearchApi } = useTableContext()

  const { Results, isLoaded, fetchData } = useApiMockCall(apiCall, apiMaxNum, false, false)
  
  const debouncedSearch = useDebounce(search, 600)

  useEffect(() => {
    if (usesSearchApi && apiCall) {
      setIsSearchLoading?.(true)
      fetchData()
    }

    setGlobalFilter(debouncedSearch)
  }, [debouncedSearch]);

  useEffect(() => {
    // Only set the results if there's a search term or it will debounce table data set back to search set
    if (debouncedSearch && isLoaded && Results?.length > 0) {
      setSearchResults?.(Results)
      setGlobalFilter(search)
      setIsSearchLoading?.(false)
    }
  }, [Results, isLoaded, debouncedSearch])
  
  const clearSearch = () => {
    setSearch('')
    setSearchResults?.([])
  }

  return (
    <>
      <SearchIcon />
      <SearchInput
        name={'search'}
        value={search}
        onChange={e => setSearch(e.target.value)}
        placeholder={'Search...'}
      />
      {/* todo: remove seach icon click  */}
      {/* todo: replace with str has length function  */}
      {search && <CloseIcon onClick={clearSearch} />}
    </>
  )
}

export default Search
