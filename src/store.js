import { configureStore } from "@reduxjs/toolkit";
import nameReducer from "./slice/nameSlice";
import cartReducer from "./slice/cartItemSlice";

const store = configureStore({
  reducer: {
    name: nameReducer,
    cartItem: cartReducer,
  },
});

export default store;
