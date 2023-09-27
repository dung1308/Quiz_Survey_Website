import React from "react";
import Layout from "../../components/templates/layout";
import {
  Box,
  Button,
  Card,
  FormControl,
  Input,
  InputLabel,
} from "@mui/material";
import Leather from "../../assets/images/leather.png";

const Login: React.FC = () => {
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log("username:", username);
    console.log("password:", password);
  };

  return (
    <>
      <Layout />
      <Box
        sx={{
          width: 3 / 5,
          textAlign: "-webkit-center",
        }}
      >
        <Card
          className="custom-card"
          sx={{
            backgroundImage: `url('https://www.transparenttextures.com/patterns/leather.png')`,
            // backgroundImage: Leather,
            backgroundColor: "#f5deb3",
            border: 2,
            borderColor: "#8d6e63",
            borderRadius: "10px",
            boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.25)",
            padding: "20px",
            width: "95%",
          }}
        >
          <div style={{ margin: "auto", width: "50%" }}>
            <div style={{ padding: "10px", marginBottom: "20px" }}>
              <h1 style={{ color: "#333", textAlign: "center", margin: "0" }}>
                Sign Up Form
              </h1>
            </div>
            <form
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: "#f0f0f0",
                margin: "auto",
                padding: "20px",
                width: "50%",
                height: "50vh",
              }}
              onSubmit={handleSubmit}
            >
              <FormControl
                variant="outlined"
                required
                style={{ margin: "10px", padding: "10px", width: "100%" }}
              >
                <InputLabel htmlFor="name" required>
                  UserName
                </InputLabel>
                <Input
                  id="name"
                  type="text"
                  onChange={(event) => setUsername(event.target.value)}
                />
              </FormControl>
              <FormControl
                required
                style={{ margin: "10px", padding: "10px", width: "100%" }}
                variant="outlined"
              >
                <InputLabel htmlFor="password">Password</InputLabel>
                <Input
                  id="password"
                  type="password"
                  onChange={(event) => setPassword(event.target.value)}
                />
              </FormControl>
              <Button sx={{ m: 1 }} type="submit" variant="contained">
                Login
              </Button>
            </form>
          </div>
        </Card>
      </Box>
    </>
  );
};

export default Login;
