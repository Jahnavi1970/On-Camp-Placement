import { Button, Paper, Typography, Modal, Box } from "@mui/material";
import React, { useContext, useState } from "react";
import axios from "axios";
import { MESSAGE_TYPES } from "../constants/constant";
import MessageContext from "../context/message";
import StudentContext from "../context/student";
import PostsContext from "../context/posts";
import AdminContext from "../context/admin";

const Post = (props) => {
  const { admin } = useContext(AdminContext);
  const { setMessage } = useContext(MessageContext);
  const { setPosts } = useContext(PostsContext);
  const { student } = useContext(StudentContext);
  const [modalOpen, setModalOpen] = useState(false);
  const [appliedStudents, setAppliedStudents] = useState([]);

  const onModalClose = () => {
    setModalOpen(false);
    setAppliedStudents([]);
  };

  const findAppliedStudents = async () => {
    try {
      const res = await axios.get(
        `http://localhost:8000/posts/applied-students/${props.post._id}`
      );

      setAppliedStudents(res.data.appliedStudents);
    } catch (error) {
      setMessage({
        type: MESSAGE_TYPES.DANGER,
        description: "Error while fetching applied students!",
      });
    }
  };

  const onModalOpen = () => {
    setModalOpen(true);
    findAppliedStudents();
  };

  const wrap = { wordWrap: "break-word" };

  const onApply = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8000/posts/apply", {
        postId: props.post._id,
        studentId: student._id,
      });

      const res = await axios.get(`http://localhost:8000/posts/${student._id}`);
      setPosts(res.data.posts);
      setMessage({
        type: MESSAGE_TYPES.SUCCESS,
        description: "Successfully applied!",
      });
    } catch (error) {
      setMessage({
        type: MESSAGE_TYPES.DANGER,
        description: "Error while applying!",
      });
    }
  };

  return (
    <>
      <Modal open={modalOpen} onClose={onModalClose}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            border: "2px solid #000",
            boxShadow: 24,
            p: 4,
          }}
        >
          <Typography>
            <strong>Applied Students:</strong>
          </Typography>
          <ul style={{ margin: 0 }}>
            {appliedStudents.map((student) => (
              <li>
                <Typography
                  style={wrap}
                >{`${student?.firstName} ${student?.lastName} - ${student?.branch}`}</Typography>
              </li>
            ))}
          </ul>
        </Box>
      </Modal>

      <Paper
        elevation={3}
        sx={{ width: "500px", fontSize: "0.9rem", padding: "20px", m: "30px" }}
      >
        <h2> {props.post.company}</h2>
        <Typography style={wrap}>
          <strong>Location:</strong> {props.post.location}
        </Typography>
        <Typography style={wrap}>
          <strong>Package:</strong> {props.post.package}
        </Typography>
        <Typography style={wrap}>
          <strong>Description:</strong> {props.post.description}
        </Typography>
        <Typography>
          <strong>Branches Eligible:</strong>
        </Typography>
        <ul style={{ margin: 0 }}>
          {props.post?.branches.map((branch) => (
            <li>
              <Typography style={wrap}>{branch}</Typography>
            </li>
          ))}
        </ul>
        <Typography>
          <strong>Requirements:</strong>
        </Typography>
        <ul style={{ margin: 0 }}>
          {props.post.requirements.map((requirement) => (
            <li>
              <Typography style={wrap}>{requirement}</Typography>
            </li>
          ))}
        </ul>

        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            marginTop: "10px",
          }}
        >
          {!admin && !props.post.appliedStudents.includes(student._id) && (
            <Button variant="contained" sx={{ mr: "10px" }} onClick={onApply}>
              Apply
            </Button>
          )}

          {admin && props.post.adminId === admin._id && (
            <Button
              variant="contained"
              sx={{ mr: "10px" }}
              onClick={onModalOpen}
            >
              Applied Students
            </Button>
          )}
          <Button variant="outlined" href={props.post.website} target="_blank">
            Visit Website
          </Button>
        </div>
      </Paper>
    </>
  );
};

export default Post;
