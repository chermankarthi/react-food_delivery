import { createSlice } from "@reduxjs/toolkit";
// import data from "./data.json";

const initialState = {
  name: "",
};

const nameSlice = createSlice({
  name: "name",
  initialState,
  reducers: {
    inputName(state, action) {
      state.name = action.payload;
    },
  },
});

export const { inputName } = nameSlice.actions;

export default nameSlice.reducer;
