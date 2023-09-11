import React from 'react'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import CSVReader from './index'
import toast from 'react-hot-toast'

// Mock react-hot-toast
jest.mock('react-hot-toast', () => ({
  error: jest.fn(),
  success: jest.fn(),
}))

// Mock the API module
jest.mock('../../services/api', () => ({
  post: jest.fn(),
}))

describe('CSVReader Component', () => {
  it('renders without errors', () => {
    render(<CSVReader />)
    const uploadButton = screen.getByText('Upload')
    expect(uploadButton).toBeInTheDocument()
  })

  it('handles file selection and upload', async () => {
    render(<CSVReader />)
    const uploadButton = screen.getByText('Upload')
    const fileInput = screen.getByTestId('file')

    // Mock a file to be selected
    const file = new File(['sample csv content'], 'sample_data.csv', {
      type: 'text/csv',
    })

    // Simulate file selection
    fireEvent.change(fileInput, { target: { files: [file] } })

    // Simulate button click
    fireEvent.click(uploadButton)

    // Ensure loading spinner is displayed
    expect(screen.getByTestId('loading-spinner')).toBeInTheDocument()

    // Wait for the loading state to finish
    await waitFor(() => {
      expect(screen.getByText('Upload')).toBeInTheDocument() // Button should be back
    })
  })

  it('should display an error message when no file is selected', async () => {
    render(<CSVReader />)

    const uploadButton = screen.getByText('Upload')
    fireEvent.click(uploadButton)

    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith(
        'Please, choose a file to upload',
      )
    })
  })

  it('should display a success message when file upload is successful', async () => {
    const mockResponse = {
      status: 201,
      data: { message: 'File uploaded successfully' },
    }

    const postMock = require('../../services/api').post
    postMock.mockResolvedValue(mockResponse)

    render(<CSVReader />)

    const fileInput = screen.getByTestId('file')
    const file = new File(['file content'], 'test.csv', { type: 'text/csv' })
    fireEvent.change(fileInput, { target: { files: [file] } })

    const uploadButton = screen.getByText('Upload')
    fireEvent.click(uploadButton)

    await waitFor(() => {
      expect(toast.success).toHaveBeenCalledWith('File uploaded successfully')
    })
  })

  it('should display an error message when file upload fails', async () => {
    // const mockResponse = {
    //   status: 500,
    //   data: { error: 'Internal Server Error' },
    // }

    // const postMock = require('../../services/api').post
    // postMock.mockRejectedValue(mockResponse)

    render(<CSVReader />)

    const fileInput = screen.getByTestId('file')
    const file = new File(['file content'], 'test.csv', { type: 'text/csv' })
    fireEvent.change(fileInput, { target: { files: [file] } })

    const uploadButton = screen.getByText('Upload')
    fireEvent.click(uploadButton)

    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith('Internal Server Error')
    })
  })
})
