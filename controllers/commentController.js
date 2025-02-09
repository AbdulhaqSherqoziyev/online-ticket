import Comment from "../models/Comment.js";
import Article from "../models/Article.js";

export const createComment = async (req, res) => {
  try {
    const { content, article_id } = req.body;

    if (!content || !article_id) {
      return res.status(400).json({ message: "Content and article_id are required" });
    }

    const article = await Article.findById(article_id);
    if (!article) {
      return res.status(404).json({ message: "Article not found" });
    }

    const comment = new Comment({
      content,
      user: req.user.id, 
      article: article_id,
    });

    await comment.save();

    res.status(201).json({ message: "Comment created successfully", comment });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

export const getAllComments = async (req, res) => {
  try {
    const comments = await Comment.find().populate("user", "username").populate("article", "title");
    res.status(200).json(comments);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

export const getCommentById = async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.id).populate("user", "username").populate("article", "title");
    if (!comment) {
      return res.status(404).json({ message: "Comment not found" });
    }
    res.status(200).json(comment);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

export const deleteComment = async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.id);
    if (!comment) {
      return res.status(404).json({ message: "Comment not found" });
    }

    if (comment.user.toString() !== req.user.id) {
      return res.status(403).json({ message: "Not authorized to delete this comment" });
    }

    await comment.deleteOne();
    res.status(200).json({ message: "Comment deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};