import React from "react"
import Link from "next/link"
import Image from "next/image"
import StarRating from "./StarRating"
import { Badge } from "@/components/ui/badge"
import { ProductInterface } from "../../../../typings"
import { Card, CardContent } from "@/components/ui/card"
import { formatCurrency } from "@/utils/helper"

export default function ProductCard(product: ProductInterface) {
  return (
    <Link key={product.product_id} href={`/item/${product.product_id}`}>
      <Card className="h-auto cursor-pointer relative shadow-sm border-slate-300 hover:shadow-md">
        <CardContent className="flex flex-col gap-5 h-auto items-center justify-center p-4">
          {/* Display sale badge if some of the variants are on sale */}
          {product.tbl_variants.some((variant) => variant.variant_discount !== null) && (
            <Badge variant="default" className="bg-green-400 hover:bg-green-400 text-white rounded-full absolute top-2 left-2">
               {product.tbl_variants[0].variant_discount}% OFF
            </Badge>
          )}
          <Image
            src={`http://localhost:3001${product.tbl_variants[0]?.variant_image}`}
            alt={product.product_name}
            className="h-36 w-32 object-contain"
            width={100}
            height={100}
            loading="lazy"
          />
          <section className="w-full">
            <h3 className="text-slate-700 text-xs sm:text-sm font-medium">
              {product.product_name.length > 15 ? (`${product.product_name.slice(0, 15)}...`) : product.product_name}
            </h3>
            <StarRating rating={4} />
            {product.tbl_variants[0].variant_discount ? (
              <div className="flex items-center gap-2 ">
                <h4 className="text-slate-700 font-medium">
                {formatCurrency(product.tbl_variants[0]?.variant_price - (product.tbl_variants[0].variant_price * product.tbl_variants[0].variant_discount) / 100) || "0.00"}
              </h4>
              <p className="text-xs text-slate-500 line-through">{formatCurrency(product.tbl_variants[0].variant_price)}</p>
              </div>
            ) : (
              <h4 className="text-slate-700 font-medium">
                {formatCurrency(product.tbl_variants[0]?.variant_price) || "0.00"}
              </h4>

            )}
          </section>
        </CardContent>
      </Card>
    </Link>
  )
}
