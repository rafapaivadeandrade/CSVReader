import React from 'react'
import { render, fireEvent, waitFor, act, screen } from '@testing-library/react'
import SearchBar from './index'
import axios from 'axios'

describe('SearchBar component', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should trigger the search function with the entered search term', async () => {
    const onSearch = jest.fn()
    const setIsLoading = jest.fn()
    const setIsError = jest.fn()
    const { getByPlaceholderText } = render(
      <SearchBar
        onSearch={onSearch}
        setIsLoading={setIsLoading}
        setIsError={setIsError}
      />,
    )
    const fileInput = screen.getByTestId('search')
    // const input = getByPlaceholderText('Search...')
    fireEvent.change(fileInput, { target: { value: 'example' } })

    // Wait for debounce to finish (adjust the timeout as needed)
    await waitFor(() =>
      expect(onSearch).toHaveBeenCalledWith(expect.any(Array)),
    )

    expect(onSearch).toHaveBeenCalledTimes(1)
    expect(setIsLoading).toHaveBeenCalledTimes(2) // Should be called when input changes and when the API request is complete
    expect(setIsError).toHaveBeenCalledTimes(1) // Assuming the API request fails

    // Clean up debounce timers
    act(() => jest.runAllTimers())
  })
})
