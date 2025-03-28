import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: { value: 0 },
  reducers: {
   setUserDetails : (state,action) => {
    state.user = action.payload
    console.log("userDetails",action.payload)
   }
  },
});

export const { setUserDetails } = userSlice.actions;
export const selectCount = (state) => state.counter.value;
export default userSlice.reducer;
