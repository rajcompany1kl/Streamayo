import React from 'react'

export default function loading() {
  return (
    <div>
         <div className="flex flex-col items-center justify-center h-[70vh] text-gray-400">
        <div className="animate-pulse text-gray-700 mb-3">Loading your favorites...</div>
        <div className="w-10 h-10 border-4 border-gray-700 border-t-transparent rounded-full animate-spin"></div>
      </div>
    </div>
  )
}
