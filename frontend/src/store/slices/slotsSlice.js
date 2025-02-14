import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  slots: {},
};

export const slotsSlice = createSlice({
  name: "slots",
  initialState,
  reducers: {
    addSlot: (state, action) => {
      const { username, date, slot } = action.payload;
      if (!state.slots[username]) {
        state.slots[username] = {};
      }
      if (!state.slots[username][date]) {
        state.slots[username][date] = [];
      }
      state.slots[username][date].push(slot);
    },
    removeSlot: (state, action) => {
      const { username, date, slotIndex } = action.payload;
      state.slots[username][date].splice(slotIndex, 1);
      if (state.slots[username][date].length === 0) {
        delete state.slots[username][date];
      }
    },
    copyDaySlots: (state, action) => {
      const { username, fromDate, toDate } = action.payload;
      if (state.slots[username]?.[fromDate]) {
        state.slots[username][toDate] = [...state.slots[username][fromDate]];
      }
    },
    clearSlots: (state, action) => {
      const { username, date } = action.payload;
      if (state.slots[username] && state.slots[username][date]) {
        delete state.slots[username][date];
      }
    },
  },
});

export const { addSlot, removeSlot, copyDaySlots, clearSlots } =
  slotsSlice.actions;
export default slotsSlice.reducer;
