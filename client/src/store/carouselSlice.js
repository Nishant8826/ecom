import { baseUrl } from "@/config";
import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
    isLoading: false,
    carouselImageList: [],
}

export const addCarousel = createAsyncThunk('/carousel/add', async (image) => {
    const response = await axios.post(`${baseUrl}/carousel/add`, { image }, { withCredentials: true });
    return response?.data;
})


export const getCarousel = createAsyncThunk('/carousel/get', async () => {
    const response = await axios.get(`${baseUrl}/carousel/get`, { withCredentials: true });
    return response?.data;
})


const carouselSlice = createSlice({
    name: 'carousel',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder.addCase(addCarousel.pending, (state) => {
            state.isLoading = true;
        }).addCase(addCarousel.fulfilled, (state, action) => {
            state.isLoading = false;
        }).addCase(addCarousel.rejected, (state) => {
            state.isLoading = false;
        }).addCase(getCarousel.pending, (state) => {
            state.isLoading = true;
        }).addCase(getCarousel.fulfilled, (state, action) => {
            state.isLoading = false;
            state.carouselImageList = action?.payload?.data;
        }).addCase(getCarousel.rejected, (state) => {
            state.isLoading = false;
        })
    }
})



export default carouselSlice.reducer;