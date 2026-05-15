import { createSlice }
from "@reduxjs/toolkit";

const usSlice = createSlice({

  name: "usState",

  initialState: {

    value: [],

  },

  reducers: {

    // GET USERS
    setUsers: (state, action) => {

      state.value = action.payload;
    },

    // ADD USER
    addUser: (state, action) => {

      state.value.push(action.payload);

      localStorage.setItem(
        "users",
        JSON.stringify(state.value)
      );
    },

    // UPDATE USER
    updateUser: (state, action) => {

      const index = state.value.findIndex(

        (user) =>
          user.id === action.payload.id
      );

      if (index !== -1) {

        state.value[index] =
          action.payload;

        localStorage.setItem(
          "users",
          JSON.stringify(state.value)
        );
      }
    },
  },
});

export const {

  setUsers,
  addUser,
  updateUser,

} = usSlice.actions;

export default usSlice.reducer;