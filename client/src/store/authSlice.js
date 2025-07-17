import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    isAuthenticated: false,
    isLoading: true,
    user: null
}

export const registerUser = createAsyncThunk("/auth/signup", async (formData) => {
    const response = await axios.post("http://localhost:5000/api/v1/auth/signup", formData,
        { withCredentials: true }
    );
    return response.data;
});

export const loginUser = createAsyncThunk("/auth/login", async (formData, { rejectWithValue }) => {
    try {
        const response = await axios.post("http://localhost:5000/api/v1/auth/login", formData,
            { withCredentials: true }
        );
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
});

export const checkAuth = createAsyncThunk("/auth/check-auth", async () => {
    try {
        const response = await axios.get("http://localhost:5000/api/v1/auth/check-auth", {
            withCredentials: true,
            headers: {
                'Cache-Control': 'no-cache,no-store,must-revalidate,proxy-revalidate',
            }
        });
        return response.data;
    } catch (error) {
        return error.response.data;
    }
});

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setUser: (state, action) => { }
    },
    extraReducers: (builder) => {
        builder.addCase(registerUser.pending, (state) => {
            state.isLoading = true;
        }).addCase(registerUser.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isAuthenticated = false;
            state.user = null;
        }).addCase(registerUser.rejected, (state) => {
            state.isLoading = false;
            state.isAuthenticated = false;
            state.user = null;
        }).addCase(loginUser.pending, (state) => {
            state.isLoading = true;
        }).addCase(loginUser.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isAuthenticated = action.payload.success;
            state.user = action.payload.user ? action.payload.user : null;
        }).addCase(loginUser.rejected, (state) => {
            state.isLoading = false;
            state.isAuthenticated = false;
            state.user = null;
        }).addCase(checkAuth.pending, (state) => {
            state.isLoading = true;
        }).addCase(checkAuth.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isAuthenticated = action.payload.success;
            state.user = action.payload.user ? action.payload.user : null;
        }).addCase(checkAuth.rejected, (state) => {
            state.isLoading = false;
            state.isAuthenticated = false;
            state.user = null;
        });
    }
})


export const { setUser } = authSlice.actions;
export default authSlice.reducer;