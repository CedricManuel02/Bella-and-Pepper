"use client";
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'
export default function LinkContainer() {
  const pathname = usePathname();
  return (
   <div className="hidden md:block" >
     <nav className="w-full bg-slate-200 py-4 flex items-center gap-6 justify-center text-xs lg:text-sm">
      <Link href="/" className={pathname === "/" ? "text-green-500 underline font-medium" : "text-slate-500 font-normal"}>Home</Link>
      <Link href="/product" className={pathname === "/product" ? "text-green-500 underline font-medium" : "text-slate-500 font-normal"}>Product</Link>
      <Link href="/#about" className="text-slate-500 font-normal">About Us</Link>
    </nav>
   </div>
  )
}
