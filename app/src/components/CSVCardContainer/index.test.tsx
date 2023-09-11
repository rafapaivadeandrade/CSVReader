import React from 'react'
import { render } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import CSVCardContainer from './index'

describe('CSVCardContainer', () => {
  const sampleData = [
    {
      name: 'John',
      city: 'New York',
      country: 'USA',
      favorite_sport: 'Basketball',
    },
    // Add more sample data as needed
  ]

  it('renders without crashing', () => {
    render(<CSVCardContainer data={sampleData} />)
  })

  it('renders CSVCard components with provided data', () => {
    const { getByText, debug } = render(<CSVCardContainer data={sampleData} />)
    debug()
    // Example: You can check if a piece of data appears in the rendered component
    expect(getByText('John')).toBeInTheDocument()
    expect(getByText('New York')).toBeInTheDocument()
    expect(getByText('USA')).toBeInTheDocument()
    expect(getByText('Basketball')).toBeInTheDocument()

    // Add more assertions as needed for your specific CSVCard component structure.
  })
})
