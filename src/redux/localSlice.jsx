import { createSlice } from "@reduxjs/toolkit";

const localSlice = createSlice({

  name: "local",

  initialState: {
    users: [],
  },

  reducers: {

    addUser: (state, action) => {

      state.users.push(action.payload);
    },

    deleteUser: (state, action) => {

      state.users = state.users.filter(
        (_, index) => index !== action.payload
      );
    },

    clearUsers: (state) => {

      state.users = [];
    }

  }

});

export const {
  addUser,
  deleteUser,
  clearUsers
} = localSlice.actions;

export default localSlice.reducer;