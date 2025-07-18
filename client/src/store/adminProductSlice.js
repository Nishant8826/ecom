import { baseUrl } from "@/config";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    isLoading: false,
    products: []
};

export const addNewProduct = createAsyncThunk('/product/addNewProduct',
    async (formData) => {
        const result = await axios.post(`${baseUrl}/admin/product/add`, formData, {
            headers: {
                'Content-Type': 'application/json'
            },
        });
        return result?.data;
    }
);

export const fetchAllProducts = createAsyncThunk('/product/fetchAllProducts',
    async () => {
        const result = await axios.get(`${baseUrl}/admin/product/get`);
        return result?.data;
    }
);

export const editProduct = createAsyncThunk('/product/editNewProduct',
    async ({ id, formData }) => {
        const result = await axios.put(`${baseUrl}/admin/product/edit/${id}`, formData, {
            headers: {
                'Content-Type': 'application/json'
            },
        });
        return result?.data;
    }
);

export const deleteProduct = createAsyncThunk('/product/deleteProduct',
    async (id) => {
        const result = await axios.delete(`${baseUrl}/admin/product/delete/${id}`);
        return result?.data;
    }
);


const adminProductSlice = createSlice({
    name: 'adminProduct',
    initialState: initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchAllProducts.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(fetchAllProducts.fulfilled, (state, action) => {
                state.isLoading = false;
                state.products = action.payload.data;
            })
            .addCase(fetchAllProducts.rejected, (state, action) => {
                state.isLoading = false;
                state.products = [];
            });
    }
});

export default adminProductSlice.reducer;
