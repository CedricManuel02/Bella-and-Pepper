"use client"
import ProductContainer from '@/app/components/ProductContainer';
import StarRating from '@/app/components/shared/StarRating';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Select } from '@/components/ui/select';
import { SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { ShoppingCart, Star } from 'lucide-react';
import Image from 'next/image';
import { useParams, useRouter } from 'next/navigation'
import React from 'react'

export default function Item() {
    const router = useRouter();
    const params = useParams<{ id: string }>();

    if (params.id === null || params.id === undefined) {
        router.push("/404");
    }
    function redirectToCheckout() {
        router.push("/checkout");
    }

    return (
        <div className="w-11/12 xl:w-9/12 min-h-screen h-auto m-auto py-5">
            <figure className="flex flex-col items-center justify-start gap-4 lg:items-start lg:flex-row">
                <Image
                    src={
                        "https://morueats.com/cdn/shop/products/SamyangBuldakCheeseHotChickenFlavourRamen.png?v=1677898969"
                    }
                    alt="image"
                    width={350}
                    height={100}
                    loading="lazy"
                />
                <figcaption className="py-10">
                    <h2 className="text-lg lg:text-2xl font-semibold text-slate-700">Samyang Buldak Cheese</h2>
                    <div className="flex items-center gap-2">
                        <h4 className="text-xl font-semibold text-slate-500">₱59.00</h4>
                        <p className="text-sm text-slate-500 line-through">₱70.00</p>
                    </div>
                    <ul className="text-slate-500 text-sm flex items-center gap-2 py-4">
                        <li><Badge variant={"outline"} className="text-orange-500 border-orange-500">Noodles</Badge></li>
                        <li><Separator className="h-4" orientation={"vertical"} /></li>
                        <li><StarRating rating={2} /></li>
                        <li>4.5</li>
                        <li><Separator className="h-4" orientation={"vertical"} /></li>
                        <li>180 Sold</li>
                    </ul>
                    <p className="text-slate-500 text-sm">
                        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quibusdam debitis
                        ullam ut earum optio ad! Vitae aperiam totam impedit consequatur minima,
                        nulla voluptatem neque, reprehenderit officiis fuga similique eum ducimus.
                    </p>
                    <Select>
                        <SelectTrigger className="max-w-[150px] my-4">
                            <SelectValue placeholder="Select" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="Per Pack">Per Pack</SelectItem>
                            <SelectItem value="Per Piece">Per Piece</SelectItem>
                        </SelectContent>
                    </Select>
                    <div className="flex flex-wrap items-center gap-2">
                        <Button variant={"outline"}>Add to Cart</Button>
                        <Button onClick={redirectToCheckout} className="flex items-center justify-evenly gap-2 bg-green-500 hover:bg-green-600">
                            <ShoppingCart size={14} />
                            Checkout
                        </Button>
                    </div>
                </figcaption>
            </figure>
            <div>
                <h1 className="text-slate-700 font-semibold text-md lg:text-xl">Review</h1>
                <div className="flex overflow-x-scroll lg:overflow-hidden gap-2 text-slate-500 py-4">
                    <Button variant={"outline"}>1 star</Button>
                    <Button variant={"outline"}>2 star</Button>
                    <Button variant={"outline"}>3 star</Button>
                    <Button variant={"outline"}>4 star</Button>
                    <Button variant={"outline"}>5 star</Button>
                    <Button variant={"outline"}>With Media</Button>
                </div>
                <div className="flex flex-col gap-4 py-4">
                    {/* Customer Feedback */}
                    <div className="p-2">
                        <div className="flex items-start gap-2">
                            <Avatar className="w-8 h-8 cursor-pointer hover:opacity-90">
                                <AvatarImage src="https://github.com/shadcn.png" />
                                <AvatarFallback>CN</AvatarFallback>
                            </Avatar>
                            <div>
                                <h3 className="text-slate-700 text-sm font-medium">John Doe</h3>
                                <div className="flex items-center gap-2">
                                    <StarRating rating={5} />
                                    <p className="text-sm text-slate-500">4.8</p>
                                </div>
                                <p className="text-sm text-slate-500">Amazing Product, will order again!</p>
                            </div>
                        </div>
                    </div>
                    <div className="p-2">
                        <div className="flex items-start gap-2">
                            <Avatar className="w-8 h-8 cursor-pointer hover:opacity-90">
                                <AvatarImage src="https://github.com/shadcn.png" />
                                <AvatarFallback>CN</AvatarFallback>
                            </Avatar>
                            <div>
                                <h3 className="text-slate-700 text-sm font-medium">John Doe</h3>
                                <div className="flex items-center gap-2">
                                    <StarRating rating={2} />
                                    <p className="text-sm text-slate-500">4.8</p>
                                </div>
                                <p className="text-sm text-slate-500 py-2">Amazing Product, will order again!</p>
                                <img
                                    className="w-20 rounded hover:opacity-90 cursor-pointer"
                                    src="https://thumbs.dreamstime.com/b/samyang-spicy-noodle-flavored-cheese-110552712.jpg"
                                    alt="image"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* Other Product */}
            <ProductContainer />
        </div>
    )
}
