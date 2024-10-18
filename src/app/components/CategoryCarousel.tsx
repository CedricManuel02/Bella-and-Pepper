"use client";
import React from "react";
import Header from "./Header";
import Image from "next/image";
import Autoplay from "embla-carousel-autoplay";
import { Card, CardContent } from "@/components/ui/card";
import {Carousel,CarouselContent, CarouselItem, CarouselNext, CarouselPrevious} from "@/components/ui/carousel";

export default function CategoryCarousel() {
  const plugin = React.useRef(Autoplay({ delay: 2000, stopOnInteraction: false }));
  return (
    <React.Fragment>
      <Header text={"Popular Categories"} url={"/"} />
      <Carousel plugins={[plugin.current]} className="w-full" onMouseEnter={plugin.current.stop} onMouseLeave={plugin.current.reset}>
        <CarouselContent className="-ml-1">
          {Array.from({ length: 8 }).map((_, index) => (
            <CarouselItem key={index} className="pl-1 sm:basis-1/2 md:basis-1/4 lg:basis-1/5">
              <div className="p-1">
                <Card className="cursor-pointer shadow-xs border-slate-300">
                  <CardContent className="flex flex-col gap-5 h-auto items-center justify-center p-6">
                    <Image
                        src={"https://mahtgaekplano.com/wp-content/uploads/2020/05/liquor3.png"}
                        alt="image"
                        width={100}
                        height={100}
                        loading="lazy" 
                    />
                    <h3 className="text-sm">Drinks</h3>
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <div className="hidden xl:block">
          <CarouselPrevious/>
          <CarouselNext/>
        </div>
      </Carousel>
    </React.Fragment>
  );
}
