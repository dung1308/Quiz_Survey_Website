import React, { useState } from "react";
import {
  Button,
  TextField,
  FormControl,
  InputLabel,
  Input,
  Select,
  MenuItem,
  SelectChangeEvent,
} from "@mui/material";
import Layout from "../../components/templates/layout";
import { GetRoles } from "../../services/dataService/dataService";

const SignUp: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState<{ id: number; roleName: string, permission: string }>({ id: 0, roleName: "", permission: "" });
  const [roles, setRoles] = useState<{ id: number; roleName: string }[]>([])

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    // Submit the form data to the server
    // ...
    setLoading(false);
  };
  const handleRoleChange = (event: SelectChangeEvent<string>) => {
    const selectedRole = roles.find((role) => role.id === parseInt(event.target.value));
    if (selectedRole) {
      setRole({
        id: selectedRole.id,
        roleName: selectedRole.roleName,
        permission: selectedRole.roleName,
      });
    }
  };

  React.useEffect(() => {
    GetRoles().then((data) => {
      setRoles(data);
    });
  }, []);
  return (
    <>
      <Layout />
      <div
        style={{ margin: "auto", width: "50%" }}
      >
        <div style={{ padding: "10px", marginBottom: "20px" }}>
        <h1 style={{ color: "#333", textAlign: "center", margin: "0" }}>Sign Up Form</h1>
      </div>
        <form
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
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
              onChange={(event) => setName(event.target.value)}
            />
          </FormControl>
          <FormControl
            required
            style={{ margin: "10px", padding: "10px", width: "100%" }}
            variant="outlined"
          >
            <InputLabel htmlFor="email">Email</InputLabel>
            <Input
              id="email"
              type="email"
              onChange={(event) => setEmail(event.target.value)}
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
          <FormControl
            required
            style={{ margin: "10px", padding: "10px", width: "100%" }}
            variant="outlined"
          >
            <InputLabel htmlFor="confirmPassword">Confirm Password</InputLabel>
            <Input
              id="password"
              type="password"
              onChange={(event) => setConfirmPassword(event.target.value)}
            />
          </FormControl>
          <FormControl
            required
            style={{ margin: "10px", padding: "10px", width: "50%" }}
            variant="outlined"
          >
            <InputLabel htmlFor="role" sx={{ m: 1 }}>
              Role
            </InputLabel>
            <Select
              sx={{ m: 1 }}
              id="role"
              value={role.id.toString()}
              onChange={handleRoleChange}
            >
              {roles.map((role) => (
                <MenuItem key={role.id} value={role.id}>
                  {role.roleName}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <Button
            sx={{ m: 1 }}
            type="submit"
            variant="contained"
            disabled={loading}
          >
            Register
          </Button>
        </form>
      </div>
    </>
  );
};

export default SignUp;
