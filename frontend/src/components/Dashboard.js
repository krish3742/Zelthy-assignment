"use client";

import dayjs from "dayjs";
import { useState } from "react";
import { useSnackbar } from "notistack";
import { useSelector, useDispatch } from "react-redux";
import {
  addSlot,
  removeSlot,
  copyDaySlots,
  clearSlots,
} from "../store/slices/slotsSlice";
import {
  Container,
  Paper,
  Typography,
  Grid,
  Button,
  ToggleButton,
  Box,
  Divider,
} from "@mui/material";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";

function Dashboard() {
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const [selectedDate, setSelectedDate] = useState(dayjs());
  const bookedSlots = useSelector((state) => state.slots.global);
  const { currentUser, timezone } = useSelector((state) => state.user);
  const userSlots = useSelector(
    (state) => state.slots.userBookings[currentUser] || {}
  );

  const timeSlots = [
    "09:00 AM",
    "09:30 AM",
    "10:00 AM",
    "10:30 AM",
    "11:00 AM",
    "11:30 AM",
    "12:00 PM",
    "12:30 PM",
    "01:00 PM",
    "01:30 PM",
    "02:00 PM",
    "02:30 PM",
    "03:00 PM",
    "03:30 PM",
    "04:00 PM",
    "04:30 PM",
    "05:00 PM",
    "05:30 PM",
  ];

  const formattedDate = selectedDate.format("YYYY-MM-DD");
  const selectedSlots = userSlots[formattedDate] || [];

  const isSlotBooked = (time) => {
    return bookedSlots[formattedDate]?.includes(time);
  };

  const handleSlotToggle = (time) => {
    if (isSlotBooked(time) && !selectedSlots.includes(time)) {
      enqueueSnackbar("Slot is already booked", { variant: "error" });
      return;
    }
    const slotIndex = selectedSlots.indexOf(time);

    if (slotIndex === -1) {
      dispatch(
        addSlot({ username: currentUser, date: formattedDate, slot: time })
      );
      enqueueSnackbar("Slot added successfully", { variant: "success" });
    } else {
      dispatch(
        removeSlot({ username: currentUser, date: formattedDate, slot: time })
      );
      enqueueSnackbar("Slot removed successfully", { variant: "info" });
    }
  };

  const handleCopySlots = (fromDate) => {
    dispatch(
      copyDaySlots({
        username: currentUser,
        fromDate,
        toDate: formattedDate,
      })
    );
    enqueueSnackbar("Slots copied successfully", { variant: "success" });
  };

  const handleClearSlots = () => {
    dispatch(clearSlots({ username: currentUser, date: formattedDate }));
    enqueueSnackbar("Slots cleared successfully", { variant: "success" });
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Typography variant="h4" gutterBottom>
              Manage Availability
            </Typography>
            <Typography variant="body2" color="textSecondary">
              Timezone: {timezone}
            </Typography>
          </Box>
        </Grid>

        <Grid item xs={12} md={8}>
          <Paper elevation={3} sx={{ p: 3 }}>
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              marginBottom="10px"
            >
              <Typography variant="h6" gutterBottom>
                Available Time Slots for {formattedDate}
              </Typography>
              <Button
                variant="outlined"
                onClick={() => handleClearSlots()}
                disabled={userSlots[formattedDate] ? false : true}
              >
                Clear slots
              </Button>
            </Box>
            <Grid container spacing={1}>
              {timeSlots.map((time) => (
                <Grid item xs={6} sm={4} md={3} key={time}>
                  <ToggleButton
                    value={time}
                    selected={selectedSlots.includes(time)}
                    onChange={() => handleSlotToggle(time)}
                    fullWidth
                    sx={{ py: 1 }}
                    disabled={
                      isSlotBooked(time) && !selectedSlots.includes(time)
                    }
                  >
                    {time}
                  </ToggleButton>
                </Grid>
              ))}
            </Grid>
          </Paper>
        </Grid>

        <Grid item xs={12} md={4}>
          <Paper elevation={3} sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Calendar
            </Typography>
            <DateCalendar
              value={selectedDate}
              onChange={(newDate) => setSelectedDate(newDate)}
            />
            <Divider sx={{ mb: 1 }} />
            <Typography variant="h6" gutterBottom>
              Copy Availability
            </Typography>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
              {Object.keys(userSlots).map((date) => (
                <Button
                  key={date}
                  variant="outlined"
                  onClick={() => handleCopySlots(date)}
                  fullWidth
                  disabled={formattedDate === date ? true : false}
                >
                  Copy from {date}
                </Button>
              ))}
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}

export default Dashboard;
