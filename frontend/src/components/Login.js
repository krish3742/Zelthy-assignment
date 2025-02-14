"use client";

import { useState } from "react";
import { useSnackbar } from "notistack";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setUser } from "../store/slices/userSlice";
import {
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  Box,
} from "@mui/material";

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const [username, setUsername] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (username.trim()) {
      dispatch(setUser(username.trim()));
      enqueueSnackbar("Logged in successfully!", { variant: "success" });
      navigate("/");
    }
  };

  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          minHeight: "80vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Paper
          elevation={3}
          sx={{
            p: 4,
            width: "100%",
            display: "flex",
            flexDirection: "column",
            gap: 2,
          }}
        >
          <Typography variant="h4" align="center" gutterBottom>
            Welcome
          </Typography>
          <Typography variant="body2" align="center" color="textSecondary">
            Enter your username to continue
          </Typography>
          <form onSubmit={handleSubmit}>
            <Box
              sx={{ mt: 2, display: "flex", flexDirection: "column", gap: 3 }}
            >
              <TextField
                fullWidth
                label="Username"
                variant="outlined"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
              <Button
                type="submit"
                variant="contained"
                color="primary"
                size="large"
                fullWidth
              >
                Login
              </Button>
            </Box>
          </form>
        </Paper>
      </Box>
    </Container>
  );
}

export default Login;
