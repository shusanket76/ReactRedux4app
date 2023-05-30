import { createSlice } from "@reduxjs/toolkit";

const initialState = [
  { id: "0", name: "Shusanket" },
  { id: "1", name: "Shankar" },
  { id: "2", name: "Sudha" },
];

const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
});

export const selectAllUsers = (state) => state.basyal;
export default userSlice.reducer;
