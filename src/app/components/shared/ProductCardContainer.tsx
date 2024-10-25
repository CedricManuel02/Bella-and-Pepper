import React from 'react'

interface ProductCardContainerProps {
    children: React.ReactNode
}

export default function ProductCardContainer({ children }: ProductCardContainerProps) {
    return (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2">
            {children}
        </div>
    )
}
