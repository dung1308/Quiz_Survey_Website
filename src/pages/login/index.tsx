import React from "react";
import Layout from "../../components/templates/layout";
import {
  Box,
  Button,
  Card,
  FormControl,
  Input,
  InputLabel,
  Typography,
} from "@mui/material";
import Leather from "../../assets/images/leather.png";
import {
  GetRoleById,
  LoginData,
  UserDTO,
} from "../../services/dataService/dataService";
import { useNavigate } from "react-router-dom";

interface LoginUserDTO {
  userName: string;
  password: string;
}

const Login: React.FC = () => {
  const example: UserDTO = {
    id: 0,
    userName: "",
    password: "",
    email: "",
    isNightMode: true,
    roleId: 0,
  };
  const navigate = useNavigate();
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [userData, setUserData] = React.useState<UserDTO>(example);
  const [error, setError] = React.useState("");

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log("username:", username);
    console.log("password:", password);
  };

  const buttonLogin = async () => {
    const user: LoginUserDTO = {
      userName: username,
      password: password,
    };
    await LoginData(user).then(async (data: any) => {
      if (typeof data === "string") {
        setError(data);
        return;
      }
      localStorage.clear();
      localStorage.setItem("currentUser", JSON.stringify(data));
      localStorage.setItem("DarkMode", JSON.stringify(data.isNightMode));
      console.log("This is user", data);
      const newUserData =
        localStorage.getItem("currentUser") ?? JSON.stringify(example);
      if (data !== null) {
        const newUserDataNew: UserDTO = JSON.parse(newUserData);
        setUserData(newUserDataNew);
        console.log(newUserDataNew);
        console.log(userData);
        await GetRoleById(newUserDataNew.roleId).then((newRoleData) => {
          localStorage.setItem("Role", JSON.stringify(newRoleData));
          navigate("/");
        });
      }
    });
  };

  return (
    <>
      <Layout />
      {/* <Box
        sx={{
          width: 3 / 5,
          textAlign: "-webkit-center",
        }}
      > */}
      {/* <Card
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
        > */}
      <div style={{ margin: "auto", width: "50%" }}>
        <div style={{ padding: "10px", marginBottom: "20px" }}>
          <h1 style={{ color: "#333", textAlign: "center", margin: "0" }}>
            Login Form
          </h1>
        </div>

        {error !== "" && (
          <div style={{ padding: "10px", marginBottom: "20px" }}>
            <h2 style={{ color: "#FA1140", textAlign: "center", margin: "0" }}>
              {error}
            </h2>
          </div>
        )}

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
          <Button
            sx={{ m: 1 }}
            type="submit"
            variant="contained"
            onClick={buttonLogin}
          >
            Login
          </Button>
        </form>
      </div>
      {/* </Card> */}
      {/* </Box> */}
    </>
  );
};

export default Login;
