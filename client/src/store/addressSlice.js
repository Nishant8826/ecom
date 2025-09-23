import { baseUrl } from "@/config";
import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
    isLoading: false,
    addressList: [],
}

export const addAddress = createAsyncThunk('/address/add', async (formData) => {
    const response = await axios.post(`${baseUrl}/address/add`, formData, { withCredentials: true });
    return response?.data;
})


export const fetchUserAddress = createAsyncThunk('/address/fetchUserAddress', async (userId) => {
    try {
        const response = await axios.get(`${baseUrl}/address/get/${userId}`, { withCredentials: true });
        return response?.data;
    } catch (error) {
        console.log('error',error)
        throw error;
    }
})


export const updateAddress = createAsyncThunk('/address/update', async ({ userId, addressId, formData }) => {
    const response = await axios.put(`${baseUrl}/address/update/${userId}/${addressId}`, formData, { withCredentials: true });
    return response?.data;
})


export const deleteAddress = createAsyncThunk('/address/deleteAddress', async ({ userId, addressId }) => {
    const response = await axios.delete(`${baseUrl}/address/delete/${userId}/${addressId}`, { withCredentials: true });
    return response?.data;
})


const addressSlice = createSlice({
    name: 'address',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder.addCase(addAddress.pending, (state) => {
            state.isLoading = true;
        }).addCase(addAddress.fulfilled, (state, action) => {
            state.isLoading = false;
        }).addCase(addAddress.rejected, (state) => {
            state.isLoading = false;
        }).addCase(fetchUserAddress.pending, (state) => {
            state.isLoading = true;
        }).addCase(fetchUserAddress.fulfilled, (state, action) => {
            state.isLoading = false;
            state.addressList = action?.payload?.data;
        }).addCase(fetchUserAddress.rejected, (state,action) => {
            state.isLoading = false;
        })
    }
})



export default addressSlice.reducer;