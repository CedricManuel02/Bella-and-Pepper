import Image from "next/image";
import hero from "../app/assets/hero.png";
import { Button } from "@/components/ui/button";
import CategoryCarousel from "./components/CategoryCarousel";
import ProductContainer from "./components/ProductContainer";
import { FacebookIcon, InstagramIcon, Mail, Phone, TwitterIcon } from "lucide-react";
export default function Home() {
  return (
    <div className="w-11/12 xl:w-9/12 m-auto py-2 h-auto">
      {/* This is the hero section */}
      <div className="bg-slate-100 px-8 py-14 h-auto rounded-lg flex items-center justify-between">
        {/* This is the hero description section */}
        <div className="w-full lg:w-6/12">
          <h1 className="py-2 text-slate-700 text-xl md:text-2xl lg:text-4xl font-bold">
            A Warm Welcome to Bella &{" "}
            <span className="text-green-500">Pepper’s</span> Taste of Korea
          </h1>
          <p className="text-slate-500 py-4 text-sm">
            Authentic Korean Beverages & Cuisine – Indulge in the Rich Flavors
            of Korea with Our Selection of Traditional Drinks, Savory Dishes,
            and Sweet Treats. From Refreshing Korean Teas to Classic Delicacies,
            Experience a Taste of Korea in Every Sip and Bite!
          </p>
          <Button className="font-semibold bg-green-500 hover:bg-green-600">
            Shop Now!
          </Button>
        </div>
        {/* This is the image section */}
        <div className="h-full hidden w-5/12 lg:block">
          <Image src={hero} alt="image" width={500} height={500} loading="lazy" />
        </div>
      </div>
       
      {/* Category Section */}
      <CategoryCarousel />
      {/* About Section */}
      <div id="about" className="py-10 flex flex-col justify-between md:flex-row">
        <div className="md:w-6/12 w-full">
          <h1 className="py-2 text-green-500 text-xl md:text-2xl lg:text-4xl font-bold">About Us</h1>
          <p className="text-slate-500 py-4 text-sm">
            Welcome to Bella & Pepper, your destination for authentic Korean food and beverages! 
            Our passion for Korean cuisine drives us to offer a carefully curated selection of 
            high-quality ingredients, snacks, and drinks.
            <br/>
            <br/>
            We believe food is a celebration of culture, and we’re here to help you explore the 
            vibrant flavors of Korea. Join us on this delicious journey and bring the taste of 
            Korea to your kitchen!
          </p>
          <div className="flex gap-2 flex-col text-sm">
            <div className="flex items-center gap-2">
            <Phone className="h-8 p-2 w-8 rounded cursor-pointer bg-green-200 text-green-500"/>
            <p className="text-slate-500">(586) 245-3999</p>
            </div>
            <div className="flex items-center gap-2">
            <Mail className="h-8 p-2 w-8 rounded cursor-pointer bg-green-200 text-green-500"/>
            <p className="text-slate-500">bellaandpepper@gmail.com</p>
            </div>
          </div>
          <div className="py-4 flex items-center gap-2 justify-start">
              <TwitterIcon className="cursor-pointer text-green-600 hover:text-green-700"/>
              <FacebookIcon className="cursor-pointer text-green-600 hover:text-green-700"/>
              <InstagramIcon className="cursor-pointer text-green-600 hover:text-green-700"/>
          </div>
        </div>
        <Image
          className="rounded-lg"
          src={"https://wimg.mk.co.kr/news/cms/202409/27/news-p.v1.20240927.cbbb1215a5854621a36d854fad9beeee_P1.png"}
          alt="image"
          height={500}
          width={500}
          loading="lazy"
        />
      </div>
      {/* Product Section */}
      <ProductContainer />
     
      {/* Contact Section */}
      <div className="">

      </div>
    </div>
  );
}
