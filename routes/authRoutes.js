import express from "express";
import {register, login} from "../controllers/authController.js";
import {body} from "express-validator";
import {authMiddleware} from "../middleware/authMiddleware.js";

const router = express.Router();

router.post(
    "/register",
    [
        body("username").notEmpty().withMessage("Username is required"),
        body("email").isEmail().withMessage("Email is required"),
        body("password").isLength({min: 6}).withMessage("Password most be at least 6 characters long"),
    ],
    register
);

router.post("/login", login);

router.get("/profile", authMiddleware, (req, res) => {
    res.json({user: req.user});
});

export default router;