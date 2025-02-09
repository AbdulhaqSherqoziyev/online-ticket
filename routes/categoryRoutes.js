import express from "express";
import { createCategory, getAllCategories, getCategoryById, deleteCategory } from "../controllers/categoryController.js";
import { authMiddleware } from "../middleware/authMiddleware.js"; 

const router = express.Router();

router.post("/", authMiddleware, createCategory);
router.get("/", getAllCategories);
router.get("/:id", getCategoryById);
router.delete("/:id", authMiddleware, deleteCategory);

export default router;