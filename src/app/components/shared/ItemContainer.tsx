"use client";
import Image from "next/image";
import StarRating from "./StarRating";
import React, { useState, useEffect } from "react";
import { LoaderCircle, ShoppingCart } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { VariantsInterface, ProductInterface, CartStateInterface, } from "../../../../typings";
import { useSession } from "next-auth/react";
import { useToast } from "@/hooks/use-toast";
import { useDispatch, useSelector } from "react-redux";
import { addItem } from "@/redux/features/cart-slice";
import { addCheckoutItem, calculateCheckoutTotal, clearCheckoutItem } from "@/redux/features/checkout-slice";
import { useRouter } from "next/navigation";


export default function ItemContainer({ item }: { item: ProductInterface }) {
    const router = useRouter();
    const { toast } = useToast();
    const dispatch = useDispatch();
    const [loading, setLoading] = useState<boolean>(false);
    const { data: session, status } = useSession();
    const [quantity, setQuantity] = useState<number>(1);
    const [error, setError] = useState<boolean>(false);
    const [selectedImage, setSelectImage] = useState<VariantsInterface | null>(item.tbl_variants[0]);
    const [selectedVariant, setSelectedVariant] = useState<VariantsInterface>(item.tbl_variants[0]);
    const [discountedPrice, setDiscountedPrice] = useState<number>(0);
    const [stock, setStock] = useState<number>(0);
    const cart = useSelector((state: { cart: CartStateInterface }) => state.cart.items);

    useEffect(() => {
        if (selectedVariant) {
            setStock(selectedVariant.variant_stocks);
            setDiscountedPrice(
                selectedVariant.variant_discount !== 0
                    ? selectedVariant.variant_price - (selectedVariant.variant_price * selectedVariant.variant_discount) / 100
                    : selectedVariant.variant_price
            );
        }
    }, [selectedVariant]);

    // function that handle the selected variant selection and update the (price, discount, available stocks, image)
    const handleVariantChange = (variant_id: string) => {
        const selected = item.tbl_variants.find((variant) => variant.variant_id === variant_id);
        if (selected) {
            setSelectImage(selected); // set the selected image
            setSelectedVariant(selected);
            setQuantity(1); // Reset quantity to 1
        }
    };

    // function that handles the image change and update the image click
    const handleVariantImageChange = (variant_id: string) => {
        const selected = item.tbl_variants.find((variant) => variant.variant_id === variant_id);
        if (selected) {
            setSelectImage(selected);
        }
    };

    const handleAddToCart = async (product_id: string) => {
        setLoading(true);
        if (status === "authenticated") {
            const payload = {
                product_id,
                user_id: session?.user?.id, // Ensure `id` exists in your `session.user`
                variant_id: selectedImage?.variant_id,
                item_quantity: quantity
            };

            try {
                const findProduct = cart.find((cart) => cart.tbl_products.product_id === product_id && cart.tbl_variants.variant_id === selectedImage?.variant_id);
                if (findProduct) {
                    const currentCartQuantity = findProduct.cart_item_quantity + quantity;
                    if (currentCartQuantity > findProduct.tbl_variants.variant_stocks) {
                        toast({
                            variant: "destructive",
                            title: "Opps!",
                            description: "You reach the maximum available stock.",
                        })
                    } else {
                        const response = await fetch("http://localhost:3001/api/v1/add-to-cart", {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json",
                            },
                            body: JSON.stringify(payload),
                        });

                        if (response.ok) {
                            const data = await response.json();
                            dispatch(addItem({
                                cart_id: data.data.cart_id,
                                tbl_products: data.data.tbl_products,
                                tbl_variants: data.data.tbl_variants,
                                cart_item_quantity: quantity,
                            }));
                            toast({
                                description: "Successfully added to cart",
                            })
                        } else {
                            toast({
                                description: "Failed to add to cart",
                            })
                        }
                    }
                } else {
                    const response = await fetch("http://localhost:3001/api/v1/add-to-cart", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify(payload),
                    });

                    if (response.ok) {
                        const data = await response.json();
                        dispatch(addItem({
                            cart_id: data.data.cart_id,
                            tbl_products: data.data.tbl_products,
                            tbl_variants: data.data.tbl_variants,
                            cart_item_quantity: quantity,
                        }));
                       
                        setTimeout(() => {
                            setLoading(false);
                            toast({
                                description: "Successfully added to cart",
                            })
                        }, 3000)
                    } else {
                        setTimeout(() => {
                            setLoading(false);
                            toast({
                                description: "Failed to add to cart",
                            })
                        }, 3000)
                    }
                }
              
            } catch (error) {
                console.error("Error while adding to cart:", error);
            }
        } else {  
          setError(true);
          setLoading(false);
        }
    };

    const handleDecrement = () => {
        setQuantity(prev => (prev > 1 ? prev - 1 : 1)); // Prevent going below 1
    };

    const handleIncrement = () => {
        setQuantity(prev => (prev < stock ? prev + 1 : stock)); // Prevent going beyond available stock
    };

    async function handleCheckout(){
        if(status === "authenticated"){
            console.log("This is the item", item);
            console.log("This is the selected variant", selectedVariant);
            console.log("This is the quantity", quantity);
            dispatch(clearCheckoutItem());
            dispatch(addCheckoutItem({
                tbl_products: item,
                tbl_variants: selectedVariant,
                quantity: quantity
            }))
            dispatch(calculateCheckoutTotal());
            router.push("/checkout");
        }else{
            setError(true);
        }
    }

    return (
        <figure className="flex flex-col items-center justify-start gap-4 lg:items-start lg:flex-row">
            {/* Product Image Container */}
            <section className="w-6/12">
                {/* Display the selected variant image */}
                <Image
                    src={`http://localhost:3001${selectedImage?.variant_image || item.tbl_variants[0]?.variant_image}`}
                    className="p-4 h-full w-full"
                    alt="Product Image"
                    width={400}
                    height={100}
                    loading="lazy"
                />
                <div className="flex items-center gap-2">
                    {/* Display images of all variants, and allow the user to change the main image */}
                    {item.tbl_variants.map((variant) => (
                        <Image
                            key={variant.variant_id}
                            src={`http://localhost:3001${variant.variant_image}`}
                            alt="variant image"
                            className="h-20 w-20 p-4 border rounded opacity-70 hover:opacity-100 cursor-pointer"
                            width={70}
                            height={100}
                            loading="lazy"
                            onClick={() => handleVariantImageChange(variant.variant_id)} // Change the main image when clicked
                        />
                    ))}
                </div>
            </section>
            {/* Product Info Container */}
            <figcaption className="w-11/12 py-10">
                <h2 className="text-lg lg:text-2xl font-semibold text-slate-700">{item.product_name}</h2>
                <div className="flex items-center gap-2">
                    {/* Display the discounted price or original price */}
                    <h4 className="text-xl font-semibold text-slate-500">₱{discountedPrice.toFixed(2)}</h4>
                    {/* Show the original price only if there is a discount */}
                    {selectedVariant && selectedVariant.variant_discount !== null && (
                        <p className="text-sm text-slate-500 line-through">
                            ₱{selectedVariant.variant_price}
                        </p>
                    )}
                    <p className="text-slate-500 text-sm py-2">{stock} Available stocks</p>
                </div>
                <ul className="text-slate-500 text-sm flex items-center gap-2 py-4">
                    <li>
                        <Badge variant={"outline"} className="text-orange-500 border-orange-500">
                            {item.tbl_categories.category_name}
                        </Badge>
                    </li>
                    <li>
                        <Separator className="h-4" orientation={"vertical"} />
                    </li>
                    <li>
                        <StarRating rating={2} />
                    </li>
                    <li>
                        <Separator className="h-4" orientation={"vertical"} />
                    </li>
                    <li>180 Sold</li>
                </ul>
                <p className="text-slate-500 text-sm">{item.product_description}</p>
                <div>
                    <h3 className="font-medium py-4 text-slate-500 text-sm">Payment Method Available</h3>
                    <Badge variant={"outline"} >
                        <div className="flex items-center gap-2">
                            <Image
                                src={"https://logos-download.com/wp-content/uploads/2020/06/GCash_Logo.png"}
                                alt="Gcash"
                                className="h-auto w-auto rounded"
                                width={25}
                                height={100}
                            />
                            <p>Gcash</p>
                        </div>
                    </Badge>
                </div>
                <div className="flex flex-col md:flex-row md:items-center md:gap-2">
                    {/* Variant Selection */}
                    <Select value={selectedVariant?.variant_id} onValueChange={handleVariantChange}>
                        <SelectTrigger className="max-w-[180px] my-4">
                            <SelectValue placeholder="Select variant" />
                        </SelectTrigger>
                        <SelectContent>
                            {item.tbl_variants.map((variant) => (
                                <SelectItem key={variant.variant_id} value={variant.variant_id}>
                                    {variant.variant_name}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                    {/* Counter Selection */}
                    <div className="flex items-center gap-2 py-4">
                        <Button variant={"outline"} onClick={handleDecrement}>-</Button>
                        <Input className="w-14 text-center" type="text" value={quantity} readOnly />
                        <Button variant={"outline"} onClick={handleIncrement}>+</Button>
                    </div>
                </div>
                {error && (
                    <small className="text-red-400 font-medium">You must login first</small>
                )}
                <div className="my-4 flex flex-wrap items-center gap-2">
                    <Button onClick={() => handleAddToCart(item.product_id)} className="w-full md:w-2/12" variant={"outline"} disabled={loading}>{loading ? (<div className="flex items-center justify-center gap-2">
                        <LoaderCircle size={14} className="animate-spin"/>
                        <p>
                        Adding...
                        </p>
                    </div>) : "Add to Cart"}</Button>
                    <Button onClick={() => handleCheckout()} className="w-full md:w-2/12 flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600" disabled={loading}>
                        <ShoppingCart size={14} />
                        Checkout
                    </Button>
                </div>
            </figcaption>
        </figure>
    );
}
