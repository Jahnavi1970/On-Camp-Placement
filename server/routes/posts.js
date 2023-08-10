import express from "express";
import {
  getPosts,
  createPost,
  apply,
  getAppliedPosts,
  getAllPosts,
  getCreatedPosts,
  getAppliedStudents,
} from "../controllers/posts.js";

const router = express.Router();

router.get("/", getAllPosts);

router.get("/:userId", getPosts);

router.get("/applied/:studentId", getAppliedPosts);

router.get("/applied-students/:postId", getAppliedStudents);

router.get("/created/:adminId", getCreatedPosts);

router.post("/create-post", createPost);

router.post("/apply", apply);

export default router;
