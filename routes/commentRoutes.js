import express from "express";
import { createComment, getAllComments, getCommentById, deleteComment } from "../controllers/commentController.js";
import { authMiddleware } from "../middleware/authMiddleware.js"; 

const router = express.Router();

router.post("/", authMiddleware, createComment);
router.get("/", getAllComments);
router.get("/:id", getCommentById);
router.delete("/:id", authMiddleware, deleteComment);

export default router;