"use server"
import { Card, CardContent } from '@/components/ui/card'
import { CarouselContent, CarouselItem } from '@/components/ui/carousel'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

interface CategoriesInterface {
    category_id : string;
    category_name : string;
    category_image : string;
}
// Server Component
export default async function Carousel() {
    const response = await fetch("http://localhost:3001/api/v1/get-categories");
    const data = await response.json();
    return (
        <CarouselContent className="-ml-1">
            {data.data.map((data : CategoriesInterface) => (
                <CarouselItem key={data.category_id} className="pl-1 basis-1/2 md:basis-1/4 lg:basis-1/5">
                    <Link href={`/category/${data.category_name}`} className="p-1">
                        <Card className="h-44 cursor-pointer shadow-xs border-slate-300">
                            <CardContent className="flex flex-col gap-5 items-center justify-end p-6">
                                <Image
                                    className="object-contain h-20 w-auto"
                                    src={`http://localhost:3001${data.category_image}`}
                                    alt={data.category_name}
                                    width={100}
                                    height={100}
                                    loading="lazy"
                                />
                                <h3 className="text-sm">{data.category_name}</h3>
                            </CardContent>
                        </Card>
                    </Link>
                </CarouselItem>
            ))}
        </CarouselContent>
    )
}