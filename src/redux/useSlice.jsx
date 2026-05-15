import { createSlice } from "@reduxjs/toolkit";

const useSlice =createSlice({
    name:"useSate",
    initialState:{
        value:0
    },
reducers:{
    increment:(state)=>{
        state.value +=1
    },
    decrement:(state)=>{
        state.value -=1
    },
    reset:(state,action)=>{
        state.value=action.payload;
    },   setUsers: (state, action) => {

      state.value = action.payload;
    },

    addUser: (state, action) => {

      state.value.push(action.payload);
    }

}
})
 export const {increment,decrement,reset, setUsers, addUser}=useSlice.actions;
 export default useSlice.reducer;