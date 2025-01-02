import React from "react";
import Image from "next/image";
import { toast } from "@/hooks/use-toast";
import { Trash2Icon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { useDispatch, useSelector } from "react-redux";
import { removeItem, incrementQuantity, decrementQuantity, calculateTotal, removeSelectedItems, addSelectedItems } from "@/redux/features/cart-slice";
import { CartItemInterface, CartStateInterface } from "../../../../typings";
import { deleteCartProducts } from "../../../../actions/serverAction";
import Link from "next/link";
import { formatCurrency } from "@/utils/helper";
import { updateCheckoutItem } from "@/redux/features/cart-slice";
import { calculateCheckoutTotal, removeCheckoutItem } from "@/redux/features/checkout-slice";

export default function CartProductContainer({ disabled }: any) {
    const cartItems = useSelector(
        (state: { cart: CartStateInterface }) => state.cart.items
    );
    const selectedItems = useSelector(
        (state: { cart: CartStateInterface }) => state.cart.selectedItems
    );

    const dispatch = useDispatch();

    async function handleRemoveCartProduct(cart_id: string, variant_id: string) {
        const response = await deleteCartProducts(cart_id);
        if (response.status === 200) {
            toast({
                description: "Successfully removed from cart",
            });
            dispatch(removeItem({ cart_id }));
            dispatch(removeSelectedItems({ cart_id }))
            dispatch(removeCheckoutItem({
                variant_id: variant_id
            }))
            dispatch(calculateCheckoutTotal())
            dispatch(calculateTotal());
        } else {
            toast({
                description: "Failed to remove from cart",
            });
        }
    }

    async function handleIncrement(cart_id: string) {
        const isExisting = cartItems.find(item => item.cart_id === cart_id);
        if (isExisting && isExisting.cart_item_quantity < isExisting.tbl_variants.variant_stocks) {
            const newQuantity = isExisting.cart_item_quantity + 1;

            const response = await fetch(`http://localhost:3001/api/v1/update-cart`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ cart_id, quantity: newQuantity }),
            });

            if (response.ok) {
                dispatch(incrementQuantity({ cart_id }));
                dispatch(updateCheckoutItem({
                    product_id: isExisting.tbl_products.product_id,
                    quantity: newQuantity
                }))
                dispatch(calculateTotal());
            } else {
                console.error("Failed to update cart:", await response.text());
            }
        }
    }

    async function handleDecrement(cart_id: string) {
        const isExisting = cartItems.find(item => item.cart_id === cart_id);
        if (isExisting && isExisting.cart_item_quantity > 1) {
            const newQuantity = isExisting.cart_item_quantity - 1;

            const response = await fetch(`http://localhost:3001/api/v1/update-cart`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json", // Setting the correct content type
                },
                body: JSON.stringify({ cart_id, quantity: newQuantity }), // Correct body format
            });

            if (response.ok) {
                dispatch(decrementQuantity({ cart_id }));
                dispatch(updateCheckoutItem({
                    product_id: isExisting.tbl_products.product_id,
                    quantity: newQuantity
                }))
                dispatch(calculateTotal());
            } else {
                console.error("Failed to update cart:", await response.text());
            }
        }
    }
    function handleSelectedProduct(cart_id: string) {
        const isSelected = selectedItems.some((item) => item.cart_id === cart_id);
        if (!isSelected) {
            dispatch(addSelectedItems({ cart_id: cart_id }));
        }
        else {
            dispatch(removeSelectedItems({ cart_id: cart_id }));
        }

        dispatch(calculateTotal());
    }
    return (
        <div className="py-5 relative">
            {cartItems.length > 0 ? (
                cartItems.slice(0, 4).map((cart: CartItemInterface) => (
                    <div
                        key={cart.cart_id}
                        className={`flex items-center justify-between gap-5 py-2 ${cart.tbl_products.product_date_deleted === null ? 'opacity-100' : 'opacity-70'}`}
                    >
                        <div className="flex items-center gap-2">
                            <Checkbox onClick={() => handleSelectedProduct(cart.cart_id)}
                                disabled={cart.tbl_products.product_date_deleted !== null || disabled}
                                checked={selectedItems.some((item) => item.cart_id === cart.cart_id)}
                            />
                            <Image
                                src={`http://localhost:3001${cart.tbl_variants?.variant_image}`}
                                alt="Product image"
                                className="h-14 w-14 object-contain"
                                width={50}
                                height={100}
                                loading="lazy"
                            />
                            <section>
                                <h3 className="text-slate-700 text-xs font-medium">
                                    {cart.tbl_products.product_name.length > 25 ? (`${cart.tbl_products.product_name.slice(0, 25)}...`) : cart.tbl_products.product_name}
                                </h3>
                                {cart.tbl_variants.variant_discount !== null && cart.tbl_variants.variant_discount !== 0 && (
                                    <Badge
                                        className="text-xs font-medium text-white bg-green-500"
                                        variant={"default"}
                                    >
                                        {cart.tbl_variants.variant_discount}%
                                    </Badge>
                                )}
                                <Badge
                                    className="text-xs font-medium text-slate-500"
                                    variant={"outline"}
                                >
                                    {cart.tbl_variants.variant_name}
                                </Badge>
                                <div className="py-2 flex items-center gap-2">
                                    <h4 className="text-slate-500 text-xs font-medium">
                                        {
                                            cart.tbl_variants.variant_discount !== null ? (
                                                formatCurrency(cart.tbl_variants.variant_price - (cart.tbl_variants.variant_price * cart.tbl_variants.variant_discount) / 100)

                                            ) :
                                                (
                                                    formatCurrency(cart.tbl_variants.variant_price)

                                                )
                                        }
                                    </h4>
                                    {cart.tbl_variants.variant_discount && (
                                        <p className="text-xs text-slate-500 line-through">{cart.tbl_variants.variant_price}</p>
                                    )}
                                    <p className="text-slate-500 text-xs">
                                        {cart.tbl_variants?.variant_stocks} Available stock
                                    </p>
                                </div>
                                {/* Quantity control */}
                                <div className="flex items-center gap-2 w-20">
                                    <Button
                                        variant="outline"
                                        onClick={() => handleDecrement(cart.cart_id)}
                                        disabled={cart.tbl_products.product_date_deleted !== null || disabled}
                                    >
                                        -
                                    </Button>
                                    <Input
                                        className="w-14 text-center"
                                        type="text"
                                        value={cart.cart_item_quantity}
                                        readOnly
                                        disabled={cart.tbl_products.product_date_deleted !== null || disabled}
                                    />
                                    <Button
                                        variant="outline"
                                        onClick={() => handleIncrement(cart.cart_id)}
                                        disabled={cart.tbl_products.product_date_deleted !== null || disabled}
                                    >
                                        +
                                    </Button>
                                </div>

                                {cart.tbl_products.product_date_deleted && (
                                    <p className="text-red-500 text-xs">Not Available</p>
                                )}
                            </section>
                        </div>
                        <Button
                            disabled={disabled}
                            onClick={() => handleRemoveCartProduct(cart.cart_id, cart.tbl_variants.variant_id)}
                            variant={"link"}>
                            <Trash2Icon
                                size={20}
                                className="text-slate-500 cursor-pointer hover:text-slate-700"
                            />
                        </Button>
                    </div>
                ))
            ) : (
                <div className="text-slate-500 text-center">
                    Your cart is empty
                </div>
            )}
            {cartItems.length > 4 && (
                <div className="py-4 flex items-center justify-center">
                    <Link className=" text-green-500 font-medium hover:underline" href={"/"}>See More ({cartItems.length - 4}) items </Link>
                </div>
            )}
        </div>
    );
}
