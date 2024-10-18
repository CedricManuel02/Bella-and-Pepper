"use client";
import { useSearchParams } from 'next/navigation';
import React from 'react'

export default function Product() {
    const search = useSearchParams();
    const params = search.get("query");

  return (
    <div>
      This is the search : {params}
    </div>
  )
}
