import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
  company: {
    type: String,
    required: true,
  },
  adminId: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  package: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  requirements: {
    type: Array,
    default: [],
  },
  website: {
    type: String,
    required: true,
  },
  branches: {
    type: Array,
    default: [],
  },
  appliedStudents: {
    type: Array,
    default: [],
  },
});

const Post = mongoose.model("Post", postSchema);

export default Post;
