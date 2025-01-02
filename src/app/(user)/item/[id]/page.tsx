"use server"
import React from "react"
import { Button } from "@/components/ui/button";
import StarRating from "@/app/components/shared/StarRating";
import { getItem } from "../../../../../actions/serverAction";
import ProductContainer from "@/app/components/ProductContainer";
import ItemContainer from "@/app/components/shared/ItemContainer";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default async function Item({ params }: { params: { id: string } }) {
    const { id } = await params;
    const response = await getItem(id);
    return (
        <div className="w-11/12 xl:w-9/12 min-h-screen h-auto m-auto py-5">
            <ItemContainer item={response.data} />
            {/* Product Review */}
            <div className="py-10">
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
                    {response.data.tbl_comment.length > 0 ? (
                        <div>
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
                    ) : (
                        <div>
                            No review
                        </div>
                    )}
                </div>
            </div>
            {/* Other Product */}
            <ProductContainer />
        </div>
    )
}
