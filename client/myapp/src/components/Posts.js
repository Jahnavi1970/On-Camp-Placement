import React, { useContext, useEffect } from "react";
import Post from "./Post";
import axios from "axios";
import PostsContext from "../context/posts";
import StudentContext from "../context/student";
import AdminContext from "../context/admin";

const Posts = () => {
  const { admin } = useContext(AdminContext);
  const { posts, setPosts } = useContext(PostsContext);
  const { student } = useContext(StudentContext);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await axios.get(
          admin
            ? "http://localhost:8000/posts"
            : `http://localhost:8000/posts/${student._id}`
        );
        setPosts(res.data.posts);
      } catch (error) {}
    };

    fetchPosts();
  }, []);

  console.log(posts);

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
      {posts.map((post) => (
        <Post post={post} />
      ))}
    </div>
  );
};

export default Posts;
