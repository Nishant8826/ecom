import { baseUrl } from "@/config";
import axios from "axios";
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const initialState = {
    isLoading: false,
    searchResults: []
}

export const getSearchResults = createAsyncThunk('shop/search', async (keyword) => {
    const response = await axios.get(`${baseUrl}/shop/search/${keyword}`);
    return response?.data;
})

const searchProductSlice = createSlice({
    name: 'searchProductSlice',
    initialState,
    reducers: {
        resetSearchResults: (state) => {
            state.searchResults = [];
        }
    },
    extraReducers: builder => {
        builder.addCase(getSearchResults.pending, (state) => {
            state.isLoading = true;
        }).addCase(getSearchResults.fulfilled, (state, action) => {
            state.isLoading = false;
            state.searchResults = action.payload.data ? action.payload.data : [];
        }).addCase(getSearchResults.rejected, (state) => {
            state.isLoading = false;
            state.searchResults = [];
        });
    }
})

export const { resetSearchResults } = searchProductSlice.actions;

export default searchProductSlice.reducer;