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
  const { currentUser, timezone } = useSelector((state) => state.user);
  const slots = useSelector((state) => state.slots.slots[currentUser] || {});

  const timeSlots = [
    "09:00",
    "09:30",
    "10:00",
    "10:30",
    "11:00",
    "11:30",
    "12:00",
    "12:30",
    "13:00",
    "13:30",
    "14:00",
    "14:30",
    "15:00",
    "15:30",
    "16:00",
    "16:30",
    "17:00",
    "17:30",
  ];

  const formattedDate = selectedDate.format("YYYY-MM-DD");
  const selectedSlots = slots[formattedDate] || [];

  const handleSlotToggle = (time) => {
    const slotIndex = selectedSlots.indexOf(time);

    if (slotIndex === -1) {
      dispatch(
        addSlot({ username: currentUser, date: formattedDate, slot: time })
      );
      enqueueSnackbar("Slot added successfully", { variant: "success" });
    } else {
      dispatch(
        removeSlot({ username: currentUser, date: formattedDate, slotIndex })
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
                disabled={slots[formattedDate] ? false : true}
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
              {Object.keys(slots).map((date) => (
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
