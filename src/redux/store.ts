import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./features/cart-slice";
import checkoutReducer from "./features/checkout-slice";
import productReducer from "./features/product-slice";
 export const store = configureStore({
    reducer: {
        cart: cartReducer,
        product: productReducer,
        checkout: checkoutReducer,
    }
 });
 export type RootState = ReturnType<typeof store.getState>
 export type AppDispatch = typeof store.dispatch;