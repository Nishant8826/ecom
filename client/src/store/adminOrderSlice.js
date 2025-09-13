import { createSlice } from "@reduxjs/toolkit";


const orderSlice = createSlice({
    name: 'adminOrder',
    initialState: {
        orderList: [],
        orderDetails: {}
    },
    reducers: {
        setOrderDetails: (state, action) => {
            state.orderDetails = action.payload;
        },
        setOrderList: (state, action) => {
            state.orderList = action.payload;
        },

        removeOrderDetails: (state) => {
            state.orderDetails = {};
        },
        removeOrders: (state) => {
            state.orderList = [];
        },

    }
})

export const { setOrderDetails, setOrderList, removeOrderDetails, removeOrders } = orderSlice.actions;
export default orderSlice.reducer;