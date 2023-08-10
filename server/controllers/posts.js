import Post from "../models/Post.js";
import Student from "../models/Student.js";

export const getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find();
    return res.status(200).json({ posts });
  } catch (error) {
    return res.status(404).json({ message: "Internal server error!" });
  }
};

export const getPosts = async (req, res) => {
  try {
    const { userId } = req.params;
    let posts = await Post.find();

    posts = posts.filter((post) => !post.appliedStudents.includes(userId));

    return res.status(200).json({ posts });
  } catch (error) {
    return res.status(404).json({ message: "Internal server error!" });
  }
};

export const createPost = async (req, res) => {
  try {
    const newPost = req.body.post;
    console.log(newPost);
    await Post.create(newPost);
    return res.status(201).json({ message: "Post Created" });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error!" });
  }
};

export const apply = async (req, res) => {
  try {
    const { studentId, postId } = req.body;

    const post = await Post.findById(postId);

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    const student = await Student.findById(studentId);

    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    const appliedStudents = post.appliedStudents;

    if (appliedStudents.includes(studentId)) {
      return res.status(404).json({ message: "Already applied" });
    }

    if (!post?.branches.includes(student?.branch)) {
      return res
        .status(404)
        .json({ message: "Your branch is not applicable for this opening" });
    }

    const updatedAppliedStudents = [...appliedStudents, studentId];

    await Post.findByIdAndUpdate(postId, {
      appliedStudents: updatedAppliedStudents,
    });

    return res.status(201).json({ message: "Applied Successfully!" });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error!" });
  }
};

export const getAppliedPosts = async (req, res) => {
  try {
    const studentId = req.params.studentId;
    let posts = await Post.find();
    posts = posts.filter((post) => post.appliedStudents.includes(studentId));
    return res.status(200).json({ posts, message: "Fetched SuccessFully" });
  } catch (error) {
    return res.status(500).json({ message: "Unexpected Error" });
  }
};

export const getCreatedPosts = async (req, res) => {
  try {
    const adminId = req.params.adminId;
    let posts = await Post.find({ adminId });
    return res.status(200).json({ posts, message: "Fetched SuccessFully" });
  } catch (error) {
    return res.status(500).json({ message: "Unexpected Error" });
  }
};

export const getAppliedStudents = async (req, res) => {
  try {
    const postId = req.params.postId;

    const post = await Post.findById(postId);

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    const appliedStudentIds = post.appliedStudents;
    const appliedStudents = await Student.find({
      _id: {
        $in: appliedStudentIds,
      },
    });

    console.log(appliedStudents);

    return res
      .status(200)
      .json({ appliedStudents, message: "Fetched SuccessFully" });
  } catch (error) {
    return res.status(500).json({ message: "Unexpected Error" });
  }
};
