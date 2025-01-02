"use client"
import React from "react"
import Barcode from "react-barcode"

export default function ProductBarcode({product_upc_number} : any) {
  return (
    <Barcode value={product_upc_number} width={0.8} fontSize={13} height={20} />
  )
}
