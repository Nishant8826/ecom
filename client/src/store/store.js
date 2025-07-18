import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import adminProductsSlice from "./adminProductSlice";

const store = configureStore({
    reducer: {
        auth: authReducer,
        adminProduct: adminProductsSlice
    }
})

export default store;