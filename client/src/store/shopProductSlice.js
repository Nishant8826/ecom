import { baseUrl } from "@/config";
import axios from "axios";

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
    isLoading: false,
    products: [],
    productDetails: null
};

export const fetchAllFilteredProducts = createAsyncThunk('/products/fetchAllProducts', async ({ filterParams, sortBy }) => {
    try {
        const query = new URLSearchParams({ ...filterParams, sortBy })
        const response = await axios.get(`${baseUrl}/shop/product/get?${query}`);
        return response?.data
    } catch (error) {
        return error.response?.data;
    }
})


export const fetchProductDetail = createAsyncThunk('/products/fetchProductDetail', async (id) => {
    try {
        const response = await axios.get(`${baseUrl}/shop/product/get/${id}`);
        return response?.data
    } catch (error) {
        return error.response?.data;
    }
})


const shoppingProduct = createSlice({
    name: 'shoppingProduct',
    initialState,
    reducers: {
        resetProductDetails: (state) => {
            state.productDetails = null;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchAllFilteredProducts.pending, (state) => {
            state.isLoading = true;
        }).addCase(fetchAllFilteredProducts.fulfilled, (state, action) => {
            state.isLoading = false;
            state.products = action.payload?.data ? action.payload?.data : [];
        }).addCase(fetchAllFilteredProducts.rejected, (state) => {
            state.isLoading = false;
        }).addCase(fetchProductDetail.pending, (state) => {
            state.isLoading = true;
        }).addCase(fetchProductDetail.fulfilled, (state, action) => {
            state.isLoading = false;
            state.productDetails = action.payload?.data ? action.payload?.data : [];
        }).addCase(fetchProductDetail.rejected, (state) => {
            state.isLoading = false;
            state.productDetails = null;
        })
    }
})

export const { resetProductDetails } = shoppingProduct.actions;

export default shoppingProduct.reducer;