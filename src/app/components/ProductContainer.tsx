import { Card, CardContent } from "@/components/ui/card";
import React from "react";
import Header from "./Header";
import Image from "next/image";
import { Star } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default function ProductContainer() {
  return (
    <React.Fragment>
      <Header text={"Products"} url={"/"} />
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2">
       {Array.from({length: 15}).map((_, index) => (
         <Card key={index} className="h-72 cursor-pointer relative shadow-sm border-slate-300">
         <CardContent className="flex flex-col gap-5 h-auto items-center justify-center p-4">
          <Badge className="bg-green-400 text-white rounded-full absolute top-2 left-2">Sale</Badge>
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
             <h3 className="text-slate-700 text-sm font-semibold ">Samyang Buldak Carbonara</h3>
             <div className="flex items-center gap-2">
               <div className="flex items-center justify-start">
                 <Star fill="orange" size={14} strokeWidth={0}/>
                 <Star fill="orange" size={14} strokeWidth={0}/>
                 <Star fill="orange" size={14} strokeWidth={0}/>
                 <Star fill="orange" size={14} strokeWidth={0}/>
                 <Star fill="gray" size={14} strokeWidth={0}/>
               </div>
               <p className="text-slate-500 text-sm font-medium">4.5</p>
             </div>
             <div className="flex items-center gap-2">
               <h4 className="text-green-500 font-semibold">₱59.00</h4>
               <p className="line-through text-sm text-slate-500">₱78.00</p>
             </div>
           </section>
         </CardContent>
       </Card>
       ))}
      </div>
    </React.Fragment>
  );
}
