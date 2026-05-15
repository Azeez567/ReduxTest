import { createSlice } from "@reduxjs/toolkit";
const formSlice = createSlice({
    name: "form",
    initialState: {
        value: 0
    },
    reducers: {
        increment: (state) => {
            state.value += 1
        },
        decrement: (state) => {
            state.value -= 1
        },
        reset: (state, action) => {
            state.value = action.payload;
        },
        someval: (state, action) => {
            state.value += action.payload;
        },
        minval:(state,action) =>{
            state.value -= action.payload
        }

    }
})
export const { increment, decrement, reset, someval,minval } = formSlice.actions;
export default formSlice.reducer;

