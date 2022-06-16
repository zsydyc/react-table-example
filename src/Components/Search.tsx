import { useEffect, useState } from 'react'
import styled from '@emotion/styled'
import SearchIcon from '@material-ui/icons/Search'
import {TextField} from '@material-ui/core'
import {TableInstance} from 'react-table'

const SearchArticle = styled.article`
  background: rgba(255, 255, 255, 0.15);
  padding: 0.5em;
  border-radius: 1em;
`

interface SearchProps<T extends Record<string, unknown>> {
  instance: TableInstance<T>;
}

const Search = <T extends Record<string, unknown>>({ instance }: SearchProps<T>) => {
  const { setGlobalFilter } = instance

  const [search, setSearch] = useState('')

  useEffect(
    () => { console.log('setting filter'); setGlobalFilter(search) },
    [search, setGlobalFilter]
  );

  return (
    <SearchArticle>
      <SearchIcon />
      <TextField
        name={'search'}
        value={search}
        onChange={e => setSearch(e.target.value)}
      />
    </SearchArticle>
  )
}

export default Search
