import { configureStore, combineReducers } from "@reduxjs/toolkit";

import userReducer from "../redux/userSlice";
import countReducer from "../redux/countSlice";
import localReducer from "../redux/localSlice";
import counterReducer from "../redux/counterSlice";
import formReducer from "../redux/formSlice";
import useReducer from "../redux/useSlice";
import usReducer from "../redux/usSlice";
import { persistStore, persistReducer } from "redux-persist";

const storage = {
  getItem: (key) => {
    return Promise.resolve(localStorage.getItem(key));
  },
  setItem: (key, value) => {
    localStorage.setItem(key, value);
    return Promise.resolve(true);
  },
  removeItem: (key) => {
    localStorage.removeItem(key);
    return Promise.resolve();
  },
};

/* reducers */
const rootReducer = combineReducers({
  
  user: userReducer,
  count: countReducer,
  counter: counterReducer,
  local: localReducer,
  form: formReducer,
  useSate: useReducer,
  usState: usReducer,
});

/* persist config */
const persistConfig = {
  key: "root",
  storage,
  whitelist: ["user","counter","count","local","form","useSate","usState"],
  //blacklist: ["counter"],
};

/* wrap reducer */
const persistedReducer = persistReducer(persistConfig, rootReducer);

/* store */
export const store = configureStore({
  reducer: persistedReducer,

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [
          "persist/PERSIST",
          "persist/REHYDRATE",
          "persist/FLUSH",
          "persist/REGISTER",
        ],
      },
    }),
});

/* persistor */
export const persistor = persistStore(store);