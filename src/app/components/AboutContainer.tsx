import React from 'react'
import Image from "next/image";
import { FacebookIcon, InstagramIcon, Mail, Phone, TwitterIcon } from "lucide-react";
export default function AboutContainer() {
  return (
    <div id="about" className="py-10 flex flex-col justify-between lg:flex-row">
    <div className="lg:w-6/12 w-full">
      <h1 className="py-2 text-green-500 text-xl md:text-2xl lg:text-4xl font-bold">About Us.</h1>
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
      className="rounded-lg w-full lg:max-w-[500px]"
      src={"https://wimg.mk.co.kr/news/cms/202409/27/news-p.v1.20240927.cbbb1215a5854621a36d854fad9beeee_P1.png"}
      alt="image"
      height={500}
      width={500}
      loading="lazy"
    />
  </div>
  )
}
