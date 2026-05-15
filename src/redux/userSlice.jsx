import { createSlice } from "@reduxjs/toolkit";
const userSlice = createSlice({
  name: "user",

  initialState: {
    users: [], name: "", age: "", city: "",
  },

  reducers: {
    addUser: (state, action) => {
      state.users.push(action.payload);
    },
    deleteUser: (state) => {
      state.users.pop();
    },
    currentDelete: (state, action) => {
      state.users.splice(action.payload, 1);
    },
    clearUsers: (state) => {
      state.users = [];
    },
    updateUser: (state, action) => {
      const { index, updatedUser } = action.payload;
      state.users[index] = updatedUser;
    }
  }
});

export const { addUser, clearUsers, deleteUser, currentDelete, updateUser } = userSlice.actions;

export default userSlice.reducer;