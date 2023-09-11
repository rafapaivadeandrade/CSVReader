import React, { useState } from 'react'
import toast from 'react-hot-toast'
import api from '../../services/api'

const CSVReader: React.FC = () => {
  const [file, setFile] = useState<File | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault()
    const selectedFile = event.target.files?.[0]
    console.log(selectedFile)
    if (selectedFile?.type !== 'text/csv') {
      toast.error('Please, insert a csv file type')
      return null
    } else {
      if (selectedFile) {
        setFile(selectedFile)
        return
      }
    }
  }

  const handleUpload = async () => {
    setIsLoading(true)

    if (!file) {
      toast.error('Please, choose a file to upload')
      setIsLoading(false)
      return
    }

    const formData = new FormData()
    formData.append('file', file)

    try {
      const response = await api.post('/files', formData)
      if (response.status === 201) {
        toast.success(response.data.message)
      } else {
        toast.error(response.data.error)
      }
      console.log(response.data)
    } catch (error) {
      toast.error('Internal Server Error')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="bg-gray-100 p-4 rounded-md shadow-md sm:p-1 sm:w-full w-[720px] max-w-[54%]">
      <h2 className="text-xl font-semibold text-stone mb-4">Upload CSV File</h2>
      <div className="flex flex-row sm:flex-col md:flex-col">
        <input
          data-testid="file"
          type="file"
          accept=".csv, .xlsx, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
          onChange={handleFileChange}
          className="mb-2 text-stone"
        />
        {isLoading ? (
          <div data-testid="loading-spinner" className="flex justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-stone"></div>
          </div>
        ) : (
          <button
            onClick={handleUpload}
            className="bg-ton hover:bg-secondary_color text-stone font-semibold py-2 px-4 rounded-full"
          >
            Upload
          </button>
        )}
      </div>
    </div>
  )
}

export default CSVReader
