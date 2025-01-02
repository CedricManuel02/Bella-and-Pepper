"use client";
import React from "react"
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import ProductAction from "./ProductAction";
import { Badge } from "@/components/ui/badge";
import ProductBarcode from "./ProductBarcode";
import { formatCurrency } from "@/utils/helper";
import ProductContainer from "./ProductContainer";
import BarcodeContainer from "./BarcodeContainer";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import { TableCell, TableRow } from "@/components/ui/table"
import { ProductArrayInterface, ProductInterface } from "../../../../../typings";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import { toast } from "@/hooks/use-toast";
import { addSelectedItems, removeSelectedItems } from "@/redux/features/product-slice";

export default function ProductTableRow() {
    const dispatch = useDispatch();
    const product = useSelector((state: { product: ProductArrayInterface }) => state.product.items);
    const selected = useSelector((state: { product: ProductArrayInterface }) => state.product.selected_items);
    function handleSelectedItems(value: string) {
        if(!value){
            toast({
                variant: "destructive",
                title: "Opps!",
                description: "Product ID is required."
            });
        }
        const isSelected = selected.some((item) => item.product_id === value);
        if(!isSelected){
            dispatch(addSelectedItems({ product_id: value }));
            return;
        } else {
            dispatch(removeSelectedItems({ product_id: value }));
        }
    }
    
    if(product.length === 0){
        return <React.Fragment>
            <TableRow>
                <TableCell colSpan={8}>
                    <div className="flex items-center justify-center space-x-2 text-slate-500">
                        <p>No products found.</p>
                    </div>
                </TableCell>
            </TableRow>
        </React.Fragment>
    }

    return (
        <React.Fragment>
            {product.filter((item) => item.product_date_deleted === null).map((data: ProductInterface) => (
                <TableRow key={data.product_id} className="text-slate-500">
                    <TableCell>
                        <Checkbox value={data.product_id} onCheckedChange={() => handleSelectedItems(data.product_id)} />
                    </TableCell>
                    <TableCell>
                        <BarcodeContainer>
                            <ProductBarcode product_upc_number={data.product_upc_number} />
                        </BarcodeContainer>
                    </TableCell>
                    <TableCell className="font-medium flex items-center gap-2 whitespace-break-spaces">
                        <Image
                            src={`http://localhost:3001/${data.tbl_variants[0].variant_image}`}
                            alt="Product Image"
                            className="h-12 w-12 object-contain"
                            width={50}
                            height={100}
                            loading="lazy"
                        />
                        <h3>{data.product_name.length > 20 ? `${data.product_name.slice(0, 20)}...` : data.product_name}</h3>
                    </TableCell>
                    <TableCell>
                        <Badge variant={"secondary"}>{data.tbl_categories.category_name}</Badge>
                    </TableCell>
                    <TableCell>

                        {data.tbl_variants[0].variant_discount ? (
                            <div className="flex items-end gap-2">
                                <p>{formatCurrency(data.tbl_variants[0].variant_price - (data.tbl_variants[0].variant_price * data.tbl_variants[0].variant_discount) / 100)}</p>
                                <small className="line-through">
                                    {formatCurrency(data.tbl_variants[0].variant_price)}
                                </small>
                            </div>
                        ) : (
                            <p>{formatCurrency(data.tbl_variants[0].variant_price)}</p>
                        )}
                    </TableCell>
                    <TableCell className="cursor-pointer hover:underline">
                        <HoverCard>
                            <HoverCardTrigger>{data.tbl_variants.length} available</HoverCardTrigger>
                            <HoverCardContent>
                                {data.tbl_variants.map(variants => (
                                    <div key={variants.variant_id} className="font-medium flex py-2 items-center gap-2 whitespace-break-spaces">
                                        <Image
                                            src={`http://localhost:3001/${variants.variant_image}`}
                                            alt="Variant Image"
                                            className="h-auto w-auto"
                                            width={40}
                                            height={100}
                                            loading="lazy"
                                        />
                                        <div>
                                            <p className="text-sm">{variants.variant_name}</p>
                                            <div className="flex items-center space-x-2 text-xs text-slate-500">
                                                {variants.variant_discount ? (
                                                    <div className="flex items-end gap-2">
                                                        <p>{formatCurrency(variants.variant_price - (variants.variant_price * variants.variant_discount) / 100)}</p>
                                                        <small className="line-through">
                                                            {formatCurrency(variants.variant_price)}
                                                        </small>
                                                    </div>
                                                ) : (
                                                    <p>{formatCurrency(variants.variant_price)}</p>
                                                )}
                                                <Separator className="h-3" orientation="vertical" />
                                                <p>{variants.variant_stocks} Stocks</p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </HoverCardContent>
                        </HoverCard>
                    </TableCell>
                    <TableCell>
                        {data.product_date_deleted ? (
                            <Badge variant={"outline"} className="border border-red-500 text-red-500 font-medium">Not Available</Badge>
                        ) : (
                            <Badge variant={"outline"} className="border border-green-500 text-green-500 font-medium">Active</Badge>
                        )}
                    </TableCell>
                    <TableCell>
                        <ProductContainer>
                            <ProductAction product_date_deleted={data.product_date_deleted} product_id={data.product_id} />
                        </ProductContainer>
                    </TableCell>
                </TableRow>
            ))}
        </React.Fragment>
    )
}
