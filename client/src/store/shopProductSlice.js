import { baseUrl } from "@/config";
import axios from "axios";

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
    isLoading: false,
    products: []
};

export const fetchAllFilteredProducts = createAsyncThunk('/products/fetchAllProducts', async () => {
    try {
        const response = await axios.get(`${baseUrl}/shop/product/get`);
        return response?.data
    } catch (error) {
        return error.response?.data;
    }
})

const shoppingProduct = createSlice({
    name: 'shoppingProduct',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchAllFilteredProducts.pending, (state) => {
            state.isLoading = true;
        }).addCase(fetchAllFilteredProducts.fulfilled, (state, action) => {
            state.isLoading = false;
            state.products = action.payload?.data ? action.payload?.data : [];
        }).addCase(fetchAllFilteredProducts.rejected, (state) => {
            state.isLoading = false;
        })
    }
})

export default shoppingProduct.reducer;