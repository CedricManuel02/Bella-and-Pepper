import Link from 'next/link'
import React from 'react'

export default function Header({text, url} : any) {
  return (
    <div className="py-5 flex items-center justify-between">
        <h1 className="text-slate-700 font-semibold text-md lg:text-xl">{text}</h1>
        <Link className="text-green-500 underline text-xs lg:text-sm" href={url}>See all</Link>
    </div>
  )
}