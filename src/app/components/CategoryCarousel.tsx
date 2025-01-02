import React, {  } from "react";
import Header from "@/app/components/shared/Header";
import CarouselCard from "./shared/CarouselCard";
import CarouselContainer from "./shared/CarouselContainer";


export default function CategoryCarousel() {

  return (
    <div className="py-5">
      <Header text={"Popular Categories"} url={"/products"} />
      <CarouselContainer>
        <CarouselCard/>
      </CarouselContainer>
    </div>
  );
}
