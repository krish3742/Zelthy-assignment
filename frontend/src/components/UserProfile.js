import { useSnackbar } from "notistack";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setTimezone, setUser } from "../store/slices/userSlice";
import {
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  Box,
  MenuItem,
} from "@mui/material";

function UserProfile() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { currentUser, timezone } = useSelector((state) => state.user);
  const { enqueueSnackbar } = useSnackbar();

  const handleTimezoneChange = (e) => {
    dispatch(setTimezone(e.target.value));
    enqueueSnackbar("Timezone updated successfully", { variant: "success" });
  };

  const handleLogout = () => {
    dispatch(setUser(null));
    navigate("/login");
  };

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom>
        Profile Settings
      </Typography>

      <Paper elevation={3} sx={{ p: 3, mt: 2 }}>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
          <TextField
            label="Username"
            value={currentUser}
            InputProps={{ readOnly: true }}
            fullWidth
          />

          <TextField
            select
            label="Timezone"
            value={timezone}
            onChange={handleTimezoneChange}
            fullWidth
          >
            {Intl.supportedValuesOf("timeZone").map((tz) => (
              <MenuItem key={tz} value={tz}>
                {tz}
              </MenuItem>
            ))}
          </TextField>

          <Button
            variant="contained"
            color="primary"
            onClick={handleLogout}
            fullWidth
            size="large"
          >
            Logout
          </Button>
        </Box>
      </Paper>
    </Container>
  );
}

export default UserProfile;
