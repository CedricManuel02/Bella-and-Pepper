import React from 'react'

export default function EditContainer({ children }: { children: React.ReactNode }) {
    return (
        <div className="w-8/12 xl:w-6/12 min-h-screen h-auto m-auto py-10">
            <h3 className="font-semibold text-sm text-slate-700 py-4">Edit Product</h3>
            {children}
        </div>
    )
}
