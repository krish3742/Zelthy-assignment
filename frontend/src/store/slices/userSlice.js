import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentUser: null,
  timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
  theme: "light",
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.currentUser = action.payload;
    },
    setTimezone: (state, action) => {
      state.timezone = action.payload;
    },
    toggleTheme: (state) => {
      state.theme = state.theme === "light" ? "dark" : "light";
    },
  },
});

export const { setUser, setTimezone, toggleTheme } = userSlice.actions;
export default userSlice.reducer;
