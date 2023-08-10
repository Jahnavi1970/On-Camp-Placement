import React, { useContext, useState } from "react";
import {
  Alert,
  AlertTitle,
  Autocomplete,
  TextField,
  Stack,
} from "@mui/material";
import { MESSAGE_TYPES } from "../constants/constant";
import axios from "axios";

import { Paper, FormGroup, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { BRANCHES } from "../constants/constant";
import StudentContext from "../context/student";
import AdminContext from "../context/admin";
import MessageContext from "../context/message";

const fullWidth = {
  width: "100%",
};

const PostForm = () => {
  const { student } = useContext(StudentContext);
  const { admin } = useContext(AdminContext);
  const { setMessage } = useContext(MessageContext);
  const navigate = useNavigate();
  const [post, setPost] = useState({
    company: "",
    location: "",
    package: "",
    requirements: [],
    website: "",
    branches: [],
    desciption: "",
    adminId: admin?._id,
  });

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:8000/posts/create-post", {
        post: post,
      });
      setMessage({
        type: MESSAGE_TYPES.SUCCESS,
        description: "Successfully created post",
      });
      navigate("/posts");
    } catch (error) {
      setMessage({
        type: MESSAGE_TYPES.DANGER,
        description: "Error while creating post",
      });
    }
  };

  if (student) {
    return (
      <div className="sign-up-container">
        <Alert severity="error">
          <AlertTitle>Error</AlertTitle>
          You do not have the permissions to visit this page
        </Alert>
      </div>
    );
  }

  return (
    <div className="sign-up-container">
      <Paper elevation={3} className="form-paper">
        <div className="sign-up-header">
          <h1>Create a new opening</h1>
        </div>

        <FormGroup className="sign-up-form">
          <div className="sign-up-input">
            <TextField
              style={fullWidth}
              name="company"
              label="Company"
              type="text"
              variant="standard"
              onChange={(e) =>
                setPost((prevPost) => ({
                  ...prevPost,
                  [e.target.name]: e.target.value,
                }))
              }
            />
          </div>
          <div className="sign-up-input">
            <TextField
              style={fullWidth}
              name="location"
              label="Location"
              type="text"
              variant="standard"
              onChange={(e) =>
                setPost((prevPost) => ({
                  ...prevPost,
                  [e.target.name]: e.target.value,
                }))
              }
            />
          </div>
          <div className="sign-up-input">
            <TextField
              style={fullWidth}
              name="package"
              label="Package"
              type="text"
              variant="standard"
              onChange={(e) =>
                setPost((prevPost) => ({
                  ...prevPost,
                  [e.target.name]: e.target.value,
                }))
              }
            />
          </div>
          <div className="sign-up-input">
            <TextField
              style={fullWidth}
              name="requirements"
              label="Requirements"
              type="text"
              variant="standard"
              onChange={(e) =>
                setPost((prevPost) => ({
                  ...prevPost,
                  [e.target.name]: e.target.value,
                }))
              }
            />
          </div>
          <div className="sign-up-input">
            <TextField
              style={fullWidth}
              name="website"
              label="Website Link"
              type="link"
              variant="standard"
              onChange={(e) =>
                setPost((prevPost) => ({
                  ...prevPost,
                  [e.target.name]: e.target.value,
                }))
              }
            />
          </div>
          <Stack spacing={3} sx={{ width: "100%", alignItems: "center" }}>
            <Autocomplete
              className="sign-up-input"
              multiple
              id="tags-standard"
              onChange={(e, value) =>
                setPost((prevPost) => ({
                  ...prevPost,
                  branches: value,
                }))
              }
              options={BRANCHES}
              getOptionLabel={(option) => option}
              renderInput={(params) => (
                <TextField
                  {...params}
                  variant="standard"
                  label="Branches Eligible"
                />
              )}
            />
          </Stack>
          <div className="sign-up-input">
            <TextField
              onChange={(e) =>
                setPost((prevPost) => ({
                  ...prevPost,
                  [e.target.name]: e.target.value,
                }))
              }
              style={{ ...fullWidth, minWidth: "450px" }}
              name="description"
              label="Description"
              multiline
              rows={2}
              type="text"
              variant="standard"
              //onChange={(event) => setPassword(event.target.value)}
            />
          </div>
          <Button variant="contained" type="submit" onClick={onSubmit}>
            Create Post
          </Button>
        </FormGroup>
      </Paper>
    </div>
  );
};

export default PostForm;
