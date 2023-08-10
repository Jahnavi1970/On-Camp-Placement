import React, { useContext } from "react";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  Alert,
  AlertTitle,
  FormGroup,
  Paper,
  TextField,
  Button,
  Link,
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material";
import StudentContext from "../context/student";
import AdminContext from "../context/admin";
import MessageContext from "../context/message";
import { MESSAGE_TYPES, USER } from "../constants/constant";

const fullWidth = {
  width: "100%",
};

const SignIn = () => {
  const { student, setStudent } = useContext(StudentContext);
  const { admin, setAdmin } = useContext(AdminContext);
  const { setMessage } = useContext(MessageContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [alignment, setAlignment] = useState("student");

  const handleChange = (e, newAlignment) => {
    setAlignment(newAlignment);
  };

  const navigate = useNavigate();

  if (student || admin) {
    return (
      <div className="sign-up-container">
        <Alert severity="info">
          <AlertTitle>Note</AlertTitle>
          You are signed in. Please logout to visit this page
        </Alert>
      </div>
    );
  }

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `http://localhost:8000/${alignment}/sign-in`,
        {
          email: email,
          password: password,
        }
      );
      if (alignment === "student") {
        navigate("/posts");
        localStorage.setItem("student", JSON.stringify(res.data.student));
        setStudent(res.data.student);
      } else if (alignment === "admin") {
        navigate("/create-post");
        localStorage.setItem("admin", JSON.stringify(res.data.admin));
        setAdmin(res.data.admin);
      }
      setMessage({
        type: MESSAGE_TYPES.SUCCESS,
        description: "Successfully signed in!",
      });
    } catch (error) {
      setMessage({
        type: MESSAGE_TYPES.DANGER,
        description: "Error while signing in!",
      });
    }
  };

  return (
    <div className="sign-up-container">
      <ToggleButtonGroup
        color="primary"
        value={alignment}
        exclusive
        onChange={handleChange}
        aria-label="Platform"
        sx={{ m: "15px" }}
      >
        <ToggleButton value="admin">Admin</ToggleButton>
        <ToggleButton value="student">Student</ToggleButton>
      </ToggleButtonGroup>
      <Paper elevation={3} className="sign-up-paper">
        <div className="sign-up-header">
          <h1>Sign In</h1>
        </div>

        <FormGroup className="sign-up-form">
          <div className="sign-up-input">
            <TextField
              style={fullWidth}
              name="email"
              label="Email"
              type="email"
              variant="standard"
              onChange={(event) => setEmail(event.target.value)}
            />
          </div>
          <div className="sign-up-input">
            <TextField
              style={fullWidth}
              name="password"
              label="Password"
              type="password"
              variant="standard"
              onChange={(event) => setPassword(event.target.value)}
            />
          </div>
          <div className="sign-up-button">
            <Button variant="contained" type="submit" onClick={onSubmit}>
              Sign In
            </Button>
          </div>
          <div className="sign-up-button">
            Don't have an account?{" "}
            <Link href="/sign-up" underline="always">
              Sign Up
            </Link>
          </div>
        </FormGroup>
      </Paper>
    </div>
  );
};

export default SignIn;
