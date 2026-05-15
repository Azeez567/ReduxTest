import { createSlice } from "@reduxjs/toolkit";
const countSlice = createSlice({
    name: "count",
    initialState: { value:0},
    reducers: {
        add: (state) => {
            state.value += 2
        },
        sub: (state) => {
            state.value -= 2
        },
        mul: (state, action) => {
            state.value *= action.payload;
        },
        reset: (state, action) => {
            state.value = action.payload;
        },
        subnum:(state,action)=>{
            state.value -=action.payload;
        },
        start:(state)=>{
            state.value = 0;
        }
       
    }
});
export const { add, sub, mul, reset,subnum ,start} = countSlice.actions;
export default countSlice.reducer;