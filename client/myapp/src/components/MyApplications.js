import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Alert, AlertTitle } from "@mui/material";
import MessageContext from "../context/message";
import { MESSAGE_TYPES } from "../constants/constant";
import StudentContext from "../context/student";
import Post from "./Post";
import AdminContext from "../context/admin";

const MyApplications = () => {
  const { admin } = useContext(AdminContext);
  const [appliedPosts, setAppliedPosts] = useState([]);
  const [createdPosts, setCreatedPosts] = useState([]);
  const { setMessage } = useContext(MessageContext);
  const { student } = useContext(StudentContext);

  useEffect(() => {
    const fetchAppliedPosts = async () => {
      try {
        const res = await axios.get(
          `http://localhost:8000/posts/applied/${student._id}`
        );
        const appliedPosts = res.data.posts;
        setAppliedPosts(appliedPosts);
      } catch (error) {
        setMessage({
          type: MESSAGE_TYPES.DANGER,
          description: "Error while fetching applied posts",
        });
      }
    };

    const fetchCreatedPosts = async () => {
      try {
        const res = await axios.get(
          `http://localhost:8000/posts/created/${admin._id}`
        );
        const createdPosts = res.data.posts;
        setAppliedPosts(createdPosts);
      } catch (error) {
        setMessage({
          type: MESSAGE_TYPES.DANGER,
          description: "Error while fetching created posts",
        });
      }
    };

    if (student) {
      fetchAppliedPosts();
    } else {
      fetchCreatedPosts();
    }
  }, []);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexWrap: "wrap",
        width: "100%",
      }}
    >
      {appliedPosts.map((post) => (
        <Post post={post} />
      ))}
      {createdPosts.map((post) => (
        <Post post={post} />
      ))}
    </div>
  );
};

export default MyApplications;
