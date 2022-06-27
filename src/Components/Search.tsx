import { useEffect, useState } from 'react'
import {TableInstance} from 'react-table'
import { ReactComponent as SearchIcon  } from '../Icons/Magnifying_glass.svg';
import { ReactComponent as CloseIcon  } from '../Icons/X.svg';

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
      <SearchIcon/>
      <input
        name={'search'}
        value={search}
        onChange={e => setSearch(e.target.value)}
      />
      {/* todo: remove seach icon click  */}
      {/* todo: replace with str has length function  */}
      {search && <CloseIcon onClick={clearSearch} />}
    </>
  )
}

export default Search
