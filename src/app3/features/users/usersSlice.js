import { createSlice } from "@reduxjs/toolkit";

const initialState = [
  { id: 0, name: "Shusanket" },
  { id: 1, name: "Shankar" },
  { id: 2, name: "Sudha" },
  { id: 3, name: "Rukesh" },
  { id: 4, name: "Sindhu" },
  { id: 5, name: "Meghraj" },
  { id: 6, name: "Laxmi" },
  { id: 7, name: "Hari Basyal" },
  { id: 8, name: "Susan" },
  { id: 9, name: "Odion" },
  { id: 10, name: "Eunice" },
];

const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
});

export const selectAllUsers = (state) => state.basyal;
export default userSlice.reducer;
