import express from "express";
import { loginUser, logout, registerUser } from "../controllers/authController.js";
const authRouter = express.Router();

authRouter.post("/login", loginUser);
authRouter.post("/register", registerUser);
authRouter.post("/logout", logout);


export default authRouter;
