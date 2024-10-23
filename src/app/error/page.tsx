import { Button } from '@/components/ui/button'
import { CircleX } from 'lucide-react'
import React from 'react'

export default function Error() {
  return (
    <div className="w-full h-screen flex flex-col gap-4 items-center justify-center">
      <CircleX className="text-red-500" size={40} />
      <h3 className="text-2xl font-medium text-slate-700">Payment Failed!</h3>
      <p className="text-slate-500">Your transaction has failed due to some technical error. Please try again</p>
      <Button className="w-full lg:w-96">Continue Shopping</Button>
    </div>
  )
}
