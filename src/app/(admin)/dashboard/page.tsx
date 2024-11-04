import { Card } from '@/components/ui/card'
import React from 'react'

export default function Dashboard() {
  return (
    <div className="w-11/12 xl:w-9/12 min-h-screen h-auto m-auto py-10">
      <div className="w-full flex flex-col gap-2 py-4">
        <h2 className="text-slate-700 font-semibold text-md lg:text-xl">Dashboard</h2>
        <p className="text-slate-500 text-xs lg:text-sm">Hello Welcome Admin!</p>
      </div>
      {/*Card */}
      <div className="grid grid-cols-4 gap-2">
        {Array.from({ length: 4 }).map((_, index) => (
          <Card key={index} className="rounded-md h-auto p-4 cursor-pointer relative shadow-sm border-slate-300">
            <h4 className="text-slate-500 text-sm font-medium">Total Revenue</h4>
            <h2 className="text-slate-700 text-lg font-semibold">$15,231.89</h2>
          </Card>
        ))}

      </div>
     
    </div>
  )
}
