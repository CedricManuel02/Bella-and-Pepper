import React from 'react'

export default function ProductContainer({children} : any) {
  return (
    <div className="flex items-center space-x-2">
      {children}
    </div>
  )
}
