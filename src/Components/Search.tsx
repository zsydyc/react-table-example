import { useEffect, useState } from 'react'
import {TableInstance} from 'react-table'

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
  
  const clearSearch = () => {
    setSearch('');
  }

  return (
    <>
{/* // todo: repalce this with search icon */}
      <span style={{color: "white"}}>ICON</span>
      <input
        name={'search'}
        value={search}
        onChange={e => setSearch(e.target.value)}
      />
      {/* todo: remove seach icon click  */}
      {/* todo: replace with str has length function  */}
      {search && <span style={{color: "white"}} onClick={clearSearch}>X</span>}
    </>
  )
}

export default Search
