import { Link as RouterLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Button,
  Box,
} from "@mui/material";
import {
  Brightness4 as DarkIcon,
  Brightness7 as LightIcon,
  AccountCircle,
} from "@mui/icons-material";

import { toggleTheme } from "../store/slices/userSlice";

function Navbar() {
  const dispatch = useDispatch();
  const { currentUser, theme } = useSelector((state) => state.user);

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography
          variant="h6"
          component={RouterLink}
          to="/"
          sx={{ flexGrow: 1, textDecoration: "none", color: "inherit" }}
        >
          Slot Booking
        </Typography>
        {currentUser && (
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <IconButton
              color="inherit"
              onClick={() => dispatch(toggleTheme())}
              size="large"
            >
              {theme === "dark" ? <LightIcon /> : <DarkIcon />}
            </IconButton>
            <Button
              color="inherit"
              component={RouterLink}
              to="/profile"
              startIcon={<AccountCircle />}
            >
              {currentUser}
            </Button>
          </Box>
        )}
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
