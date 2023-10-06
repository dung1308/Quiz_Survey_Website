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
} from "@mui/material";

import AccountCircle from "@mui/icons-material/AccountCircle";

import PPJ_Group from "../../../assets/images/PPJ_Group.png";
import { Role, UserDTO } from "../../../services/dataService/dataService";
import { useNavigate } from "react-router-dom";

const AppBarSignIn: React.FC = () => {
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
    JSON.stringify(new UserDTO(0, "", "", "", 0));
  const newRole =
    localStorage.getItem("Role") ?? JSON.stringify(new Role(0, "", ""));
  const emptyUserData = new UserDTO(0, "", "", "", 0);
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
    <AppBar position="static" style={{ background: "#B6C4CE" }}>
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
            {localStorage.getItem("currentUser") !== null && pages.map((page) => (
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
            {localStorage.getItem("currentUser") !== null && roleData.permission === "All" && (
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
              {pages.map((page) => (
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
              ))}
            </Menu>
          </Box>
          {localStorage.getItem("currentUser") !== null && <Typography>歓迎 (いらっしゃいませ) {userData.userName}</Typography>}
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
