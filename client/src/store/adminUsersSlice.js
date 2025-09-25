import { createSlice } from "@reduxjs/toolkit";


const adminUserSlice = createSlice({
    name: 'adminUser',
    initialState: {
        userList: [],
        userDetails: {}
    },
    reducers: {
        setUserDetails: (state, action) => {
            state.userDetails = action.payload;
        },
        setUserList: (state, action) => {
            console.log(action.payload)
            state.userList = action.payload;
        },

        removeUserDetails: (state) => {
            state.userDetails = {};
        },
        removeUsers: (state) => {
            state.userList = [];
        },

    }
})

export const { setUserDetails, setUserList, removeUserDetails, removeUsers } = adminUserSlice.actions;
export default adminUserSlice.reducer;