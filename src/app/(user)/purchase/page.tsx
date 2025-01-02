"use client"
import React from "react"
import Image from "next/image";
import { Button } from "@/components/ui/button";
import ProfileSidebar from "@/app/components/shared/ProfileSidebar"

export default function Purchase() {

  return (
    <div className="w-11/12 xl:w-9/12 flex justify-center min-h-screen h-auto m-auto py-10">
      <ProfileSidebar />
      {/* Profile Form Section */}
      <div className="px-8 w-8/12">
        <h2 className="py-4 text-slate-700 font-semibold text-md">Purchase Products</h2>
        {Array.from({ length: 5 }).map((_, index) => (
          <div
            key={index}
            className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between border-b border-b-slate-200 py-4"
          >
            <div className="flex items-center gap-2">
              <Image
                src={
                  "https://morueats.com/cdn/shop/products/SamyangBuldakCheeseHotChickenFlavourRamen.png?v=1677898969"
                }
                alt="image"
                width={60}
                height={100}
                loading="lazy"
              />
              <figcaption>
                <h2 className="text-slate-700 text-sm font-medium">
                  Samyang Cheese Buldak
                </h2>
                <ul className="flex items-center text-sm gap-2 text-slate-500">
                  <li>x1</li>
                  <li>400kg</li>
                </ul>
              </figcaption>
            </div>
            <div className="flex items-center justify-end">
              <Button variant={"outline"}>Track Order</Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

