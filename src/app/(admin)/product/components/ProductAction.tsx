"use client";
import React, { useState } from "react"
import { toast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator"
import ProductActionDialog from "./ProductActionDialog";
import { deleteProducts, retrieveProducts } from "../../../../../actions/productServerAction";
import { useDispatch } from "react-redux";
import { removeProducts } from "@/redux/features/product-slice";
import { useRouter } from "next/navigation";

interface ProductActionInterface {
    product_id: string;
    product_date_deleted: string;
}

export default function ProductAction({ product_date_deleted, product_id }: ProductActionInterface) {
    const router = useRouter();
    const dispatch = useDispatch();
    const [isOpen, setIsOpen] = useState<boolean>(false);
    // Delete Products
    async function handleDeleteProduct(product_id: string) {
        setIsOpen(true);
        try {
            if (!product_id) {
                toast({
                    variant: "destructive",
                    title: "Opps!",
                    description: "Product ID is missing"
                });
            }
            const response = await deleteProducts(product_id);

            if (response.status !== 200) {
                toast({
                    variant: "destructive",
                    title: "Opps!",
                    description: response.message
                });

            }
            else {
                toast({
                    variant: "default",
                    title: "Successfully!",
                    description: response.message
                });
                dispatch(removeProducts({product_id: product_id}));

            }
        } catch (error) {
            console.log("Something went wrong", error);
        } finally {
            setIsOpen(false);
        }

    }
    // Retrieve Products
    async function handleRetrieveProduct(product_id: string) {
        setIsOpen(true);
        try {
            if (!product_id) {
                toast({
                    variant: "destructive",
                    title: "Opps!",
                    description: "Product ID is missing"
                });
            }
            const response = await retrieveProducts(product_id);

            if (response.status !== 200) {
                toast({
                    variant: "destructive",
                    title: "Opps!",
                    description: response.message
                });
            } else {
                toast({
                    variant: "default",
                    title: "Successfully!",
                    description: response.message
                });
            }
        } catch (error) {
            console.log("Something went wrong", error);
        } finally {
            setIsOpen(false);
        }

    }
    return (
        <React.Fragment>
            <Button variant={"link"} className="text-slate-500 font-medium hover:underline" onClick={() => router.push(`/product/edit/${product_id}`)}>Edit</Button>
            <Separator className="h-5" orientation="vertical" />
            {product_date_deleted ?
                <ProductActionDialog open={isOpen} isOpen={setIsOpen} action={() => handleRetrieveProduct(product_id)} id={product_id} title={"Retrieve"} description={"This will retrieve your product and list as available items"} />
                :
                <ProductActionDialog open={isOpen} isOpen={setIsOpen} action={() => handleDeleteProduct(product_id)} id={product_id} title={"Delete"} description={"This will remove your product from the list"} />
            }
        </React.Fragment>
    )
}
