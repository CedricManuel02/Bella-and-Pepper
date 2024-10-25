import React from "react";
import Image from "next/image";
import { Star } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import Header from "@/app/components/shared/Header";
import { Card, CardContent } from "@/components/ui/card";
import ProductCardContainer from "@/app/components/shared/ProductCardContainer";

export default function ProductContainer() {
  return (
    <div className="pb-10">
      <Header text={"Products"} url={"/"} />
      <ProductCardContainer>
        {Array.from({ length: 15 }).map((_, index) => (
          <Card key={index} className="h-auto cursor-pointer relative shadow-sm border-slate-300">
            <CardContent className="flex flex-col gap-5 h-auto items-center justify-center p-4">
              <Badge variant={"default"} className="bg-green-400 hover:bg-green-400 text-white rounded-full absolute top-2 left-2">
                Sale
              </Badge>
              <Image
                src={
                  "https://morueats.com/cdn/shop/products/SamyangBuldakCheeseHotChickenFlavourRamen.png?v=1677898969"
                }
                alt="image"
                width={160}
                height={100}
                loading="lazy"
              />
              <section className="w-full">
                <h3 className="text-slate-700 text-xs sm:text-sm font-medium">
                  Samyang Buldak Carbonara
                </h3>
                <div className="flex items-center gap-2">
                  <div className="flex items-center justify-start">
                    <Star fill="orange" size={14} strokeWidth={0} />
                    <Star fill="orange" size={14} strokeWidth={0} />
                    <Star fill="orange" size={14} strokeWidth={0} />
                    <Star fill="orange" size={14} strokeWidth={0} />
                    <Star fill="gray" size={14} strokeWidth={0} />
                  </div>
                  <p className="text-slate-500 text-xs sm:text-sm font-medium">
                    4.5
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <h4 className="text-green-500 font-medium">₱59.00</h4>
                  <p className="line-through text-xs sm:text-sm text-slate-500">
                    ₱78.00
                  </p>
                </div>
              </section>
            </CardContent>
          </Card>
        ))}
      </ProductCardContainer>
    </div>
  );
}
