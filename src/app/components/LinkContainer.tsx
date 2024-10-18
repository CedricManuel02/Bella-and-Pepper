import Link from 'next/link'
import React from 'react'

export default function LinkContainer() {
  return (
   <div className="hidden sm:block">
     <nav className="w-full bg-slate-100 py-4 flex items-center gap-6 justify-center text-xs lg:text-sm">
      <Link href="/" className="text-green-500 underline font-semibold">Home</Link>
      <Link href="#" className="text-slate-500 font-medium">Product</Link>
      <Link href="#" className="text-slate-500 font-medium">Category</Link>
      <Link href="#" className="text-slate-500 font-medium">About Us</Link>
      <Link href="#" className="text-slate-500 font-medium">Contact Us</Link>
    </nav>
   </div>
  )
}
