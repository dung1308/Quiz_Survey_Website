import React, { useState } from "react";
import AppBar from "@mui/material/AppBar";
import MenuIcon from "@mui/icons-material/Menu";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import {
  Box,
  Toolbar,
  IconButton,
  Menu,
  Container,
  Stack,
  Button,
  Divider,
  List,
  ListItem,
  ListItemText,
  ListItemButton,
  Avatar,
  Typography,
  styled,
  Switch,
} from "@mui/material";

import AccountCircle from "@mui/icons-material/AccountCircle";

import PPJ_Group from "../../../assets/images/PPJ_Group.png";
import AppBarImage from "../../../assets/images/App_Bar.png";
import { Role, UserDTO } from "../../../services/dataService/dataService";
import { useNavigate } from "react-router-dom";

const AppBarSignIn: React.FC<any> = ({ handleDarkModeToggle, dark }) => {
  const MaterialUISwitch = styled(Switch)(({ theme }) => ({
    width: 62,
    height: 34,
    padding: 7,
    "& .MuiSwitch-switchBase": {
      margin: 1,
      padding: 0,
      transform: "translateX(6px)",
      "&.Mui-checked": {
        color: "#fff",
        transform: "translateX(22px)",
        "& .MuiSwitch-thumb:before": {
          backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
            "#fff"
          )}" d="M4.2 2.5l-.7 1.8-1.8.7 1.8.7.7 1.8.6-1.8L6.7 5l-1.9-.7-.6-1.8zm15 8.3a6.7 6.7 0 11-6.6-6.6 5.8 5.8 0 006.6 6.6z"/></svg>')`,
        },
        "& + .MuiSwitch-track": {
          opacity: 1,
          backgroundColor:
            theme.palette.mode === "dark" ? "#8796A5" : "#aab4be",
        },
      },
    },
    "& .MuiSwitch-thumb": {
      backgroundColor: theme.palette.mode === "dark" ? "#003892" : "#001e3c",
      width: 32,
      height: 32,
      "&:before": {
        content: "''",
        position: "absolute",
        width: "100%",
        height: "100%",
        left: 0,
        top: 0,
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
          "#fff"
        )}" d="M9.305 1.667V3.75h1.389V1.667h-1.39zm-4.707 1.95l-.982.982L5.09 6.072l.982-.982-1.473-1.473zm10.802 0L13.927 5.09l.982.982 1.473-1.473-.982-.982zM10 5.139a4.872 4.872 0 00-4.862 4.86A4.872 4.872 0 0010 14.862 4.872 4.872 0 0014.86 10 4.872 4.872 0 0010 5.139zm0 1.389A3.462 3.462 0 0113.471 10a3.462 3.462 0 01-3.473 3.472A3.462 3.462 0 016.527 10 3.462 3.462 0 0110 6.528zM1.665 9.305v1.39h2.083v-1.39H1.666zm14.583 0v1.39h2.084v-1.39h-2.084zM5.09 13.928L3.616 15.4l.982.982 1.473-1.473-.982-.982zm9.82 0l-.982.982 1.473 1.473.982-.982-1.473-1.473zM9.305 16.25v2.083h1.389V16.25h-1.39z"/></svg>')`,
      },
    },
    "& .MuiSwitch-track": {
      opacity: 1,
      backgroundColor: theme.palette.mode === "dark" ? "#8796A5" : "#aab4be",
      borderRadius: 20 / 2,
    },
  }));

  const pages = [
    { name: "Survey", link: "/surveys" },
    { name: "Report", link: "/report" },
    { name: "About", link: "/about" },
    // { name: "Category", link: "/category" },
  ];
  const loginPages = [
    { name: "Login", link: "/login" },
    { name: "Sign Up", link: "/signup" },
  ];
  /*useState pages*/
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null
  );

  const newData =
    localStorage.getItem("currentUser") ??
    JSON.stringify(new UserDTO(0, "", "", "", true, 0));
  const newRole =
    localStorage.getItem("Role") ?? JSON.stringify(new Role(0, "", ""));
  const emptyUserData = new UserDTO(0, "", "", "", true, 0);
  const [userData, setUserData] = useState<UserDTO>(JSON.parse(newData));
  const [roleData, setRoleData] = useState<Role>(JSON.parse(newRole));
  const navigate = useNavigate();

  /*useState login Pages*/
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <AppBar
      position="static"
      style={{
        background: "#B6C4CE",
        backgroundImage: `url(${AppBarImage})`,
        backgroundSize: "cover",
      }}
    >
      <Container maxWidth="xl">
        <Toolbar sx={{ justifyContent: "space-between" }}>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex", mr: 1 } }}>
            <Button
              sx={{ display: { xs: "none", md: "flex", mr: 1 } }}
              style={{
                maxWidth: "340px",
                maxHeight: "100px",
                minWidth: "30px",
                minHeight: "30px",
              }}
              href="/"
              startIcon={
                <img
                  style={{
                    width: "auto",
                    maxWidth: "170px",
                    maxHeight: "50px",
                    minWidth: "30px",
                    minHeight: "30px",
                  }}
                  src={PPJ_Group}
                  alt="logo"
                />
              }
            ></Button>
            {localStorage.getItem("currentUser") !== null &&
              pages.map((page) => (
                <Button
                  variant="text"
                  key={page.name}
                  size="large"
                  sx={{ color: "#ffg", borderRadius: 28 }}
                  href={page.link}
                >
                  {page.name}
                </Button>
              ))}
            {/* {pages.map((page) => (
              <Button
                variant="text"
                key={page.name}
                size="large"
                sx={{ color: "#ffg", borderRadius: 28 }}
                href={page.link}
              >
                {page.name}
              </Button>
            ))} */}
            {localStorage.getItem("currentUser") !== null &&
              roleData.permission === "All" && (
                <Button
                  variant="text"
                  key={"category"}
                  size="large"
                  sx={{ color: "#ffg", borderRadius: 28 }}
                  href={"/category"}
                >
                  Category
                </Button>
              )}
          </Box>
          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <Button
              variant="contained"
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="info"
            >
              <MenuIcon />
            </Button>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              <MenuItem key="home" onClick={handleCloseNavMenu}>
                <Button
                  variant="text"
                  key="home"
                  size="large"
                  sx={{ color: "#ffg", borderRadius: 28 }}
                  href="/"
                >
                  Home
                </Button>
              </MenuItem>
              {pages.map((page) =>
                localStorage.getItem("currentUser") !== null ? (
                  <MenuItem key={page.name} onClick={handleCloseNavMenu}>
                    <Button
                      variant="text"
                      key={page.name}
                      size="large"
                      sx={{ color: "#ffg", borderRadius: 28 }}
                      href={page.link}
                    >
                      {page.name}
                    </Button>
                  </MenuItem>
                ) : (
                  <></>
                )
              )}
              {localStorage.getItem("currentUser") !== null &&
                roleData.permission === "All" && (
                  <MenuItem key={"category"} onClick={handleCloseNavMenu}>
                    <Button
                      variant="text"
                      key={"category"}
                      size="large"
                      sx={{ color: "#ffg", borderRadius: 28 }}
                      href={"/category"}
                    >
                      Category
                    </Button>
                  </MenuItem>
                )}
            </Menu>
          </Box>
          <MaterialUISwitch checked={dark} onChange={handleDarkModeToggle} />
          {localStorage.getItem("currentUser") !== null && (
            <Typography>歓迎 (いらっしゃいませ) {userData.userName}</Typography>
          )}
          <IconButton
            size="large"
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={handleMenu}
            color="inherit"
          >
            {localStorage.getItem("currentUser") === null ? (
              <AccountCircle />
            ) : (
              <>
                <Tooltip title={userData.userName}>
                  <Avatar
                    alt={userData.userName}
                    src="/static/images/avatar/2.jpg"
                  />
                </Tooltip>
              </>
            )}
            {/* <AccountCircle /> */}
          </IconButton>
          <Menu
            id="menu-appbar"
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            keepMounted
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            {localStorage.getItem("currentUser") === null ? (
              loginPages.map((page) => (
                <MenuItem key={page.name}>
                  <Button
                    variant="text"
                    color="info"
                    size="large"
                    sx={{ color: "#ffg", borderRadius: 28 }}
                    href={page.link}
                  >
                    {page.name}
                  </Button>
                </MenuItem>
              ))
            ) : (
              <MenuItem key={"Logout"}>
                <Button
                  variant="text"
                  color="info"
                  size="large"
                  sx={{ color: "#ffg", borderRadius: 28 }}
                  onClick={handleLogout}
                >
                  Log Out
                </Button>
              </MenuItem>
            )}
          </Menu>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default AppBarSignIn;
