import { Button } from '@/components/ui/button'
import { CircleCheck } from 'lucide-react'
import React from 'react'

export default function Success() {
  return (
    <div className="w-full h-screen flex flex-col gap-4 items-center justify-center">
      <CircleCheck className="text-green-500" size={40} />
      <h3 className="text-2xl font-medium text-slate-700">Payment Successful!</h3>
      <p className="text-slate-500">We will be sending you an email confirmation to bellaandpepper@gmail.com</p>
      <Button className="w-full lg:w-96">Continue Shopping</Button>
    </div>
  )
}
