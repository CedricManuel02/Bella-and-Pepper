import { Button } from "@/components/ui/button";
import Image from "next/image";
import React from "react";

export default function Purchase() {
  return (
    <div className="w-11/12 xl:w-9/12 min-h-screen h-auto m-auto py-10 ">
      <h2 className="py-10 text-slate-700 font-semibold text-md lg:text-xl">
        Purchase Products
      </h2>
      <div>
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
                  <li className="font-semibold">Pending</li>
                </ul>
              </figcaption>
            </div>
            <div className="flex items-center justify-end">
                <Button variant={"default"}>Track Order</Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
