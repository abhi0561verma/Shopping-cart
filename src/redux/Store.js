import { configureStore } from "@reduxjs/toolkit";
import { CartSlice } from "./Slices/cartSlice.js";


export const store = configureStore({
    reducer: {
        cart: CartSlice.reducer,
    }

})