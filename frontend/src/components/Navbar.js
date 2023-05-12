import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { useTheme } from "@mui/material";
import { useProSidebar } from "react-pro-sidebar";

import { useAuthContext } from "../auth/authContext";

const Navbar = (type) => {
  const theme = useTheme();
  const { collapseSidebar } = useProSidebar();

  const authObject = useAuthContext();
  const logoutHandler = authObject.logoutHandler;
  const authName = authObject.authState.username;
  const header=authObject.authState.userType;

  return (
    <AppBar
      position="static"
      elevation={2}
      style={{
        background: theme.palette.background.appbar,
        height: "60px",
        color: theme.palette.black[100],
      }}
    >
      <Toolbar>
        <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={{ mr: 2 }}
          onClick={() => collapseSidebar()}
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="h5" component="div" sx={{ flexGrow: 1 }}>
          Welcome, {authName}
        </Typography>
        <Typography variant="h5" component="div" sx={{ flexGrow: 1 }}>
          {header}
        </Typography>
        <Button color="inherit" onClick={() => logoutHandler()}>
          Log Out
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
