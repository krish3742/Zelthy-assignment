import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  global: {},
  userBookings: {},
};

export const slotsSlice = createSlice({
  name: "slots",
  initialState,
  reducers: {
    addSlot: (state, action) => {
      const { username, date, slot } = action.payload;
      if (!state.global[date]) {
        state.global[date] = [];
      }
      if (state.global[date].includes(slot)) {
        return;
      }
      state.global[date].push(slot);
      if (!state.userBookings[username]) {
        state.userBookings[username] = {};
      }
      if (!state.userBookings[username][date]) {
        state.userBookings[username][date] = [];
      }

      state.userBookings[username][date].push(slot);
    },
    removeSlot: (state, action) => {
      const { username, date, slot } = action.payload;
      if (state.userBookings[username]?.[date]) {
        state.userBookings[username][date] = state.userBookings[username][
          date
        ].filter((bookedSlot) => bookedSlot !== slot);
        if (state.userBookings[username][date].length === 0) {
          delete state.userBookings[username][date];
        }
      }
      if (state.global[date]) {
        state.global[date] = state.global[date].filter(
          (bookedSlot) => bookedSlot !== slot
        );
        if (state.global[date].length === 0) {
          delete state.global[date];
        }
      }
    },
    copyDaySlots: (state, action) => {
      const { username, fromDate, toDate } = action.payload;
      if (state.userBookings[username]?.[fromDate]) {
        state.userBookings[username][toDate] = [
          ...state.userBookings[username][fromDate],
        ];
      }
    },
    clearSlots: (state, action) => {
      const { username, date } = action.payload;
      if (state.userBookings[username]?.[date]) {
        state.userBookings[username][date].forEach((slot) => {
          state.global[date] = state.global[date]?.filter(
            (bookedSlot) => bookedSlot !== slot
          );
        });
        delete state.userBookings[username][date];
      }
    },
  },
});

export const { addSlot, removeSlot, copyDaySlots, clearSlots } =
  slotsSlice.actions;
export default slotsSlice.reducer;
