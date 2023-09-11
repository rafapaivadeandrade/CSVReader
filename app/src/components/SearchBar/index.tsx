import React, { useState } from 'react'
import debounce from 'lodash.debounce'
import api from '../../services/api'

interface SearchBarProps {
  onSearch: (results: any[]) => void
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>
  setIsError: React.Dispatch<React.SetStateAction<boolean>>
}

const SearchBar: React.FC<SearchBarProps> = ({
  onSearch,
  setIsLoading,
  setIsError,
}) => {
  const [searchTerm, setSearchTerm] = useState('')

  // Use a debounced function to trigger search with a delay
  const debouncedSearch = debounce(async (term: string) => {
    setIsLoading(true)

    try {
      const response = await api.get('/users', {
        params: { q: term },
      })
      onSearch(response.data)
      setIsError(false)
    } catch (error) {
      console.error(error)
      setIsError(true)
    } finally {
      setIsLoading(false)
    }
  }, 500) // Adjust the delay (in milliseconds)

  const handleSearchTermChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const newSearchTerm = event.target.value
    setSearchTerm(newSearchTerm)

    // Trigger the debounced search function when the user stops typing
    debouncedSearch(newSearchTerm)
  }

  return (
    <div className="flex items-center space-x-4 max-w-[54%] w-[425px] sm:w-full">
      <input
        data-testid="search"
        type="text"
        placeholder="Search..."
        className="border p-2 rounded-md w-full outline-ton text-stone"
        value={searchTerm}
        onChange={handleSearchTermChange}
      />
    </div>
  )
}

export default SearchBar
