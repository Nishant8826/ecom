import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import adminProductsSlice from "./adminProductSlice";
import shoppingProductSlice from "./shopProductSlice";
import cartSlice from "./cartSlice";
import addressSlice from "./addressSlice";
import adminOrderSlice from "./adminOrderSlice";

const store = configureStore({
    reducer: {
        auth: authReducer,
        adminProduct: adminProductsSlice,
        shoppingProduct: shoppingProductSlice,
        shopCart: cartSlice,
        address: addressSlice,
        adminOrder : adminOrderSlice
    }
})

export default store;