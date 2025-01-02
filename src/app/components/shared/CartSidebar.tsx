"use client";
import React, { useEffect, useState } from "react";
import { LoaderCircle, ShoppingBag } from "lucide-react";
import { useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { calculateTotal, clearSelectedItems, listItem } from "@/redux/features/cart-slice";
import { useDispatch, useSelector } from "react-redux";
import CartProductContainer from "./CartProductContainer";
import { getCartProducts } from "../../../../actions/serverAction";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { CartStateInterface } from "../../../../typings";
import { formatCurrency } from "@/utils/helper";
import { addCheckoutItem, calculateCheckoutTotal, clearCheckoutItem } from "@/redux/features/checkout-slice";
import { useRouter } from "next/navigation";

export default function CartSidebar() {
  const router = useRouter();
  const dispatch = useDispatch();
  const { data: session } = useSession();
  const cart = useSelector((state: { cart: CartStateInterface }) => state.cart.items);
  const total = useSelector((state: { cart: CartStateInterface }) => state.cart.totalPrice);
  const selected = useSelector((state: { cart: CartStateInterface }) => state.cart.selectedItems);

  // Loading state for cart products
  const [loading, setLoading] = useState<boolean>(true);
  const [checkoutLoading, setCheckoutLoading] = useState<boolean>(false);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  useEffect(() => {
    async function getCart() {
      try {
        if (session) {
          const response = await getCartProducts(session?.user?.id);
          if (response.length > 0) {
            dispatch(clearSelectedItems())
            response.forEach((cart: any) => {
              dispatch(listItem({
                cart_id: cart.cart_id,
                tbl_products: cart.tbl_products,
                tbl_variants: cart.tbl_variants,
                cart_item_quantity: cart.cart_item_quantity,
              }));
            });
          }
        }
      } catch (error) {
        console.error("Error fetching cart products:", error);
      } finally {
        setLoading(false); // Set loading state to false after fetching is complete
      }
    }

    getCart();
    dispatch(calculateTotal());
  }, [session, dispatch]);

  function handleCheckout() {
    setCheckoutLoading(true);
    dispatch(clearCheckoutItem());

    selected.forEach((item) => {
      dispatch(addCheckoutItem({
        tbl_products: item.tbl_products,
        tbl_variants: item.tbl_variants,
        quantity: item.cart_item_quantity,
      }));
    });
      dispatch(calculateCheckoutTotal())
      setTimeout(() => {
        setCheckoutLoading(false);
        setIsOpen(false);
        router.push("/checkout");
      }, 3000)
  }

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger>
        <div className="relative">
          <span className="rounded-full h-4 w-4 text-xs absolute top-[-6px] right-[-4px] bg-green-500 text-white font-medium">{cart.length}</span>
          <ShoppingBag size={21} className="text-slate-500 cursor-pointer hover:text-slate-700" />
        </div>
      </SheetTrigger>
      <SheetContent className="w-full">
        <SheetHeader>
          <SheetTitle>My Cart ({cart.length})</SheetTitle>
          <SheetDescription>Recently added products.</SheetDescription>
        </SheetHeader>

        {/* Show loading spinner while fetching cart */}
        {loading ? (
          <div>Loading...</div>
        ) : (
         checkoutLoading ? (
          <div className="opacity-80">
            <CartProductContainer disabled={checkoutLoading}/>
          </div>
         ) : (
          <CartProductContainer/>
          )
        )}

        <div className="w-11/12 absolute bottom-5 left-4">
          <div className="py-4 flex items-center justify-between">
            <h3 className="text-slate-500 font-semibold text-sm">Total</h3>
            <p className="text-slate-700 text-lg">{formatCurrency(total)}</p>
          </div>
          <Button
            onClick={handleCheckout}
            className="w-full m-auto text-white"
            variant="default"
            disabled={total === 0 || selected.length === 0 || checkoutLoading}
          >
            {checkoutLoading ?
              <div className="flex items-center justify-center gap-2">
                <LoaderCircle size={14} className="animate-spin" />
                <p>Checking out...</p>
              </div>
              : "Proceed To Checkout"
            }
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}
