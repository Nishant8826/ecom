import { baseUrl } from "@/config";
import axios from "axios";
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const initialState = {
    isLoading: false,
    cartItems: []
}

export const addCart = createAsyncThunk('cart/addCart', async ({ userId, productId, quantity }) => {
    const response = await axios.post(`${baseUrl}/shop/cart/add`, { userId, productId, quantity }, { withCredentials: true });
    return response?.data;
})


export const fetchCart = createAsyncThunk('cart/fetchCart', async ({ userId }) => {
    const response = await axios.get(`${baseUrl}/shop/cart/${userId}`, { withCredentials: true });
    return response?.data;
})


export const updateCart = createAsyncThunk('cart/updateCart', async ({ userId, productId, quantity }) => {
    const response = await axios.put(`${baseUrl}/shop/cart/update-cart`, { userId, productId, quantity }, { withCredentials: true });
    return response?.data;
})

export const deleteCart = createAsyncThunk('cart/deleteCart', async ({ userId, productId }) => {
    const response = await axios.delete(`${baseUrl}/shop/cart/${userId}/${productId}`, { withCredentials: true });
    return response?.data;
})


const cartSlice = createSlice({
    name: 'cartSlice',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder.addCase(addCart.pending, (state) => {
            state.isLoading = true;
        }).addCase(addCart.fulfilled, (state, action) => {
            state.isLoading = false;
            state.cartItems = action.payload.data ? action.payload.data : [];
        }).addCase(addCart.rejected, (state) => {
            state.isLoading = false;
            state.cartItems = [];
        }).addCase(fetchCart.pending, (state) => {
            state.isLoading = true;
        }).addCase(fetchCart.fulfilled, (state, action) => {
            state.isLoading = false;
            state.cartItems = action.payload.data ? action.payload.data : [];
        }).addCase(fetchCart.rejected, (state) => {
            state.isLoading = false;
            state.cartItems = [];
        }).addCase(updateCart.pending, (state) => {
            state.isLoading = true;
        }).addCase(updateCart.fulfilled, (state, action) => {
            state.isLoading = false;
            state.cartItems = action.payload.data ? action.payload.data : [];
        }).addCase(updateCart.rejected, (state) => {
            state.isLoading = false;
            state.cartItems = [];
        }).addCase(deleteCart.pending, (state) => {
            state.isLoading = true;
        }).addCase(deleteCart.fulfilled, (state, action) => {
            state.isLoading = false;
            state.cartItems = action.payload.data ? action.payload.data : [];
        }).addCase(deleteCart.rejected, (state) => {
            state.isLoading = false;
            state.cartItems = [];
        })
    }
})


export default cartSlice.reducer;