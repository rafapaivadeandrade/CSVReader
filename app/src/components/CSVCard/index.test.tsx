import React from 'react'
import { render, screen } from '@testing-library/react' // Make sure to import screen
import '@testing-library/jest-dom/extend-expect' // Extend expect with Jest DOM matchers
import CSVCard from './index'

const testData = {
  name: 'John Doe',
  city: 'New York',
  country: 'USA',
  favorite_sport: 'Basketball',
}

describe('CSVCard component', () => {
  it('renders CSVCard with provided data', () => {
    render(<CSVCard data={testData} />)

    // Use screen.getByText to access the getByText function
    expect(screen.getByText('John Doe')).toBeInTheDocument()
    expect(screen.getByText('New York')).toBeInTheDocument()
    expect(screen.getByText('USA')).toBeInTheDocument()
    expect(screen.getByText('Basketball')).toBeInTheDocument()
  })
})
