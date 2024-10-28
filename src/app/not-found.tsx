"use client"
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import React from 'react'

export default function Custom404() {
  return (
    <div className="w-full text-center min-h-screen h-auto flex items-center flex-col justify-center gap-2">
        <h2 className="font-semibold text-2xl md:text-5xl text-slate-700">404</h2>
        <Image
        src={"https://cdn.svgator.com/images/2024/04/electrocuted-caveman-animation-404-error-page.gif"}
        alt="Not Found"
        className="object-cover h-80"
        width={500}
        height={500}
        loading={"lazy"}
        />
        <h4 className="text-slate-500 font-medium text-lg">Look like you&apos;re lost!</h4>
        <p className="text-slate-500 text-sm font-medium">The page you are looking for not available.</p>
        <Button variant={"default"} onClick={() => window.location.href = "/"}>Go Back</Button>
    </div>
  )
}
