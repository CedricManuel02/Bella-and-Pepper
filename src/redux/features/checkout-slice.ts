import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CheckoutArrayInterface, CheckoutInterface, ProductInterface, VariantsInterface } from "../../../typings";

// Initial state
const currentState: CheckoutInterface = {
  tbl_products: {} as ProductInterface,
  tbl_variants: {} as VariantsInterface,
  quantity: 0,
};

const initialState: CheckoutArrayInterface = {
  item: [currentState],
  totalPrice: 0, // Default state with one item
};

// Create the slice
export const cartSlice = createSlice({
  name: "checkout",
  initialState,
  reducers: {
    addCheckoutItem: (
      state,
      action: PayloadAction<{
        tbl_products: ProductInterface;
        tbl_variants: VariantsInterface;
        quantity: number;
      }>
    ) => {
      const { tbl_products, tbl_variants, quantity } = action.payload;
      state.item.push({
        tbl_products,
        tbl_variants,
        quantity,
      });
    },
    clearCheckoutItem: (state) => {
      state.item = [];
    },
    removeCheckoutItem: (state, action: PayloadAction<{variant_id: string;}>) => {
      const {variant_id} = action.payload;
      console.log(variant_id)
      state.item = state.item.filter((item) => item.tbl_variants?.variant_id !== variant_id)
    },
    calculateCheckoutTotal: (state) => {
      // Inside the reducer where you calculate the total price
      state.totalPrice = state.item.reduce((total, currentItem) => {
        // Check if tbl_variants is not null or undefined
        if (currentItem.tbl_variants) {
          const price = currentItem.tbl_variants.variant_price;
          const discount = currentItem.tbl_variants.variant_discount || 0;
          const discountedPrice = price - (price * discount) / 100;
          return total + discountedPrice * currentItem.quantity;
        }
        return total; // Return the previous total if tbl_variants is null or undefined
      }, 0);

    }
  },
});

// Export actions
export const { addCheckoutItem, clearCheckoutItem, calculateCheckoutTotal, removeCheckoutItem } = cartSlice.actions;

// Export reducer
export default cartSlice.reducer;
