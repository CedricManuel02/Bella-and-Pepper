import { Truck } from "lucide-react";
import Image from "next/image";
import React from "react";

export default function Product() {
  return (
    <div className="w-11/12 xl:w-9/12 min-h-screen h-auto m-auto py-10 ">
      <div className="py-10">
        <h2 className=" text-slate-700 font-semibold text-md lg:text-xl">
          Order ID <span className="text-slate-500">103KSAD93141324</span>
        </h2>
        <div className="flex items-center gap-2 text-green-500 font-semibold text-xs">
          <Truck size={20} />
          <p>Estimated date of delivery October 14, 2024</p>
        </div>
      </div>
      {/* Step */}
      <div className="overflow-x-scroll">
        <ul className="steps sm:steps-vertical lg:steps-horizontal w-full text-xs">
          <li className="step step-primary">
            <div className="text-slate-700 px-4">
              <h3>Order Confimed</h3>
              <p className="text-slate-500">8:00 PM, Feb 3, 2024</p>
            </div>
          </li>
          <li className="step step-primary">
          <div className="text-slate-700 px-4">
              <h3>Order Confimed</h3>
              <p className="text-slate-500">8:00 PM, Feb 3, 2024</p>
            </div>
          </li>
          <li className="step">
          <div className="text-slate-700 px-4">
              <h3>Order Confimed</h3>
              <p className="text-slate-500">8:00 PM, Feb 3, 2024</p>
            </div>
          </li>
        </ul>
      </div>
      <div className="py-10">
        <div className="flex items-start flex-col lg:flex-row gap-4">
          <div>
            <h3 className="font-semibold text-md text-slate-700 py-2">
              Delivery Information
            </h3>
            <p className="text-slate-500">John Doe</p>
            <p className="text-slate-500">(937) 878-1686</p>
            <p className="text-slate-500">
              1453 Glendale Dr Fairborn, Ohio(OH), 45324
            </p>
          </div>
          <div className="py-4">
            <h3 className="font-semibold text-md text-slate-700 py-2">
              Payment
            </h3>
            <p className="text-slate-500">Gcash</p>
          </div>
        </div>
        <div className="py-4">
          <h3 className="font-semibold text-md text-slate-700 py-2">Product</h3>
          {Array.from({ length: 2 }).map((_, index) => (
            <div
              key={index}
              className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between py-2"
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
              <div className="w-full flex items-center justify-end">
                <h3 className="text-slate-500">₱85.00</h3>
              </div>
            </div>
          ))}

          <div className="py-10 flex items-center justify-end">
            <div className="w-full md:w-96">
              <div className="py-2 flex items-center justify-between">
                <h4 className="text-slate-700">Product Total</h4>
                <p className="text-slate-700">₱285.00</p>
              </div>
              <div className="py-2 flex items-center justify-between">
                <h4 className="text-slate-700">Shipping Fee</h4>
                <p className="text-slate-700">₱50.00</p>
              </div>
              <div className="border-t py-4 flex items-center justify-between border-t-slate-200">
                <h4 className="text-slate-700">Total</h4>
                <p className="text-lg font-medium">₱250.00</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
