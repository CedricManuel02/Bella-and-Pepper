import React from 'react'

export default function CategoryAction({children} : any) {
    return (
        <div className="flex flex-grow w-full space-x-2">
            {children}
        </div>
    )
}
