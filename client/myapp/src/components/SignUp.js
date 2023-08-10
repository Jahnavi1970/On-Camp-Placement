import React, { useContext } from "react";
import { useState } from "react";
import axios from "axios";
import {
  FormGroup,
  Alert,
  AlertTitle,
  Paper,
  TextField,
  Button,
  Link,
  ToggleButton,
  ToggleButtonGroup,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import MessageContext from "../context/message";
import { BRANCHES, MESSAGE_TYPES, USER } from "../constants/constant";
import { useNavigate } from "react-router-dom";
import StudentContext from "../context/student";
import AdminContext from "../context/admin";

const fullWidth = {
  width: "100%",
};

const SignUp = () => {
  const { student, setStudent } = useContext(StudentContext);
  const { admin, setAdmin } = useContext(AdminContext);
  const { setMessage } = useContext(MessageContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [branch, setBranch] = useState("");
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
      const requestBody =
        alignment === USER.STUDENT
          ? {
              email: email,
              password: password,
              firstName: firstName,
              lastName: lastName,
              branch: branch,
            }
          : {
              email: email,
              password: password,
              firstName: firstName,
              lastName: lastName,
            };

      const res = await axios.post(
        `http://localhost:8000/${alignment}/sign-up`,
        requestBody
      );
      if (alignment === USER.STUDENT) {
        navigate("/posts");
        localStorage.setItem("student", JSON.stringify(res.data.student));
        setStudent(res.data.student);
      } else if (alignment === USER.ADMIN) {
        navigate("/create-post");
        localStorage.setItem("admin", JSON.stringify(res.data.admin));
        setAdmin(res.data.admin);
      }

      setMessage({
        type: MESSAGE_TYPES.SUCCESS,
        description: "Successfully signed up",
      });
    } catch (error) {
      setMessage({
        type: MESSAGE_TYPES.DANGER,
        description: "Error while signing up",
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
          <h1>Sign Up</h1>
        </div>
        <FormGroup className="sign-up-form">
          <div className="sign-up-input">
            <TextField
              style={fullWidth}
              name="firstName"
              label="First Name"
              type="text"
              variant="standard"
              onChange={(event) => setFirstName(event.target.value)}
            />
          </div>
          <div className="sign-up-input">
            <TextField
              style={fullWidth}
              name="lastName"
              label="Last Name"
              type="text"
              variant="standard"
              onChange={(event) => setLastName(event.target.value)}
            />
          </div>
          {alignment === USER.STUDENT && (
            <div style={{ margin: "10px" }} className="sign-up-input">
              <InputLabel id="branch">Branch</InputLabel>
              <Select
                style={fullWidth}
                labelId="branch"
                value={branch}
                size="small"
                label="Branch"
                onChange={(event) => setBranch(event.target.value)}
              >
                {BRANCHES.map((branch) => (
                  <MenuItem value={branch}>{branch}</MenuItem>
                ))}
              </Select>
            </div>
          )}
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
              Sign Up
            </Button>
          </div>
          <div className="sign-up-button">
            Already have an account?{" "}
            <Link href="/sign-in" underline="always">
              Sign In
            </Link>
          </div>
        </FormGroup>
      </Paper>
    </div>
  );
};

export default SignUp;
