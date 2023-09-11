import React from 'react'
import { motion } from 'framer-motion'

interface CSVCardProps {
  data: {
    name: string
    city: string
    country: string
    favorite_sport: string
  }
}

const CSVCard: React.FC<CSVCardProps> = ({ data }) => {
  return (
    <motion.div className="pointer-events-none min-h-[200px] min-w-5%] px-6 py-4 rounded overflow-hidden shadow-lg bg-white sm:min-w-[5%] sm:max-w-[15%]">
      <div className="font-bold text-stone text-xl mb-2">{data.name}</div>
      <p className="text-stone text-base">
        <strong>City:</strong> {data.city}
      </p>
      <p className="text-stone text-base">
        <strong>Country:</strong> {data.country}
      </p>
      <p className="text-stone text-base">
        <strong>Favorite Sport:</strong> {data.favorite_sport}
      </p>
    </motion.div>
  )
}

export default CSVCard
