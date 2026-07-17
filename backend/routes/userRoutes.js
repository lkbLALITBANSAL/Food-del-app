import express from "express";
import {
  loginuser,
  registeruser,
  verifyOTP,
  resendOTP,
} from "../controllers/userController.js";

const userRouter = express.Router();

userRouter.post("/register", registeruser);
userRouter.post("/login", loginuser);
userRouter.post("/verify-otp", verifyOTP);
userRouter.post("/resend-otp", resendOTP);

export default userRouter;