import express from "express";
import {
  getPosts,
  addPost,
  deletePost,
  getSelfPosts,
} from "../controllers/post.js";

const router = express.Router();

router.get("/", getPosts);
router.get("/self", getSelfPosts);
router.post("/", addPost);
router.delete("/:id", deletePost);

export default router;
