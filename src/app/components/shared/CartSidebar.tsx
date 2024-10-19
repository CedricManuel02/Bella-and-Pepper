import React from 'react'
import Image from "next/image";
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
  } from "@/components/ui/sheet";
  import { Checkbox } from "@/components/ui/checkbox";
  import {
    ShoppingBag,
    Star,
    Trash2Icon,
  } from "lucide-react";
import { Button } from '@/components/ui/button';
export default function CartSidebar() {
  return (
    <Sheet>
    <SheetTrigger>
      <ShoppingBag
        size={21}
        className="text-slate-500 cursor-pointer hover:text-slate-700 "
      />
    </SheetTrigger>
    <SheetContent className="w-full">
      <SheetHeader>
        <SheetTitle>My Cart</SheetTitle>
        <SheetDescription>
          Recently added products. 
        </SheetDescription>
      </SheetHeader>
      <div className="py-5 relative">
        <div className="flex items-center justify-between gap-5">
        <div className="flex items-center gap-2">
        <Checkbox />
        <Image
            src={
              "https://morueats.com/cdn/shop/products/SamyangBuldakCheeseHotChickenFlavourRamen.png?v=1677898969"
            }
            alt="image"
            width={60}
            height={100}
            loading="lazy"
          />
        <section>
          <h3 className="text-slate-700 text-xs font-medium">
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
            <p className="text-slate-500 text-xs font-medium">
              4.5
            </p>
          </div>
          <div className="flex items-center gap-2">
            <h4 className="text-green-500 font-medium">₱59.00</h4>
            <p className="line-through text-xs text-slate-500">
              ₱78.00
            </p>
          </div>
        </section>
        </div>
      <Trash2Icon size={20}
        className="text-slate-500 cursor-pointer hover:text-slate-700"/>
        </div>
      </div>
      <Button className="w-11/12 m-auto text-white absolute bottom-5 left-4" variant={"default"} disabled>Checkout</Button>
    </SheetContent>
  </Sheet>
  )
}
