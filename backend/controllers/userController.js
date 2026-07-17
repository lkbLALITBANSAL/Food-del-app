import userModel from "../Models/userModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import validator from "validator";
import sendOTP from "../utils/sendMail.js";

const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });
};

// ================= LOGIN =================

const loginuser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await userModel.findOne({
      email: email.toLowerCase().trim(),
    });

    if (!user) {
      return res.json({
        success: false,
        message: "Account doesn't exist.",
      });
    }

    if (!user.isVerified) {
      return res.json({
        success: false,
        message: "Please verify your email first.",
        verifyRequired: true,
      });
    }

    const match = await bcrypt.compare(password, user.password);

    if (!match) {
      return res.json({
        success: false,
        message: "Incorrect password.",
      });
    }

    const token = createToken(user._id);

    res.json({
      success: true,
      token,
    });
  } catch (error) {
    console.log(error);

    res.json({
      success: false,
      message: "Server Error",
    });
  }
};

// ================= REGISTER =================

const registeruser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.json({
        success: false,
        message: "Please fill all fields.",
      });
    }

    if (!validator.isEmail(email)) {
      return res.json({
        success: false,
        message: "Invalid email address.",
      });
    }

    if (
      !validator.isStrongPassword(password, {
        minLength: 8,
        minLowercase: 1,
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 1,
      })
    ) {
      return res.json({
        success: false,
        message:
          "Password must contain uppercase, lowercase, number and symbol.",
      });
    }

    let user = await userModel.findOne({
      email: email.toLowerCase().trim(),
    });

    if (user && user.isVerified) {
      return res.json({
        success: false,
        message: "Email already registered.",
      });
    }

    const salt = await bcrypt.genSalt(10);

    const hash = await bcrypt.hash(password, salt);

    const otp = Math.floor(
      100000 + Math.random() * 900000
    ).toString();

    const expiry = new Date(Date.now() + 5 * 60 * 1000);

    if (!user) {
      user = new userModel({
        name,
        email: email.toLowerCase().trim(),
        password: hash,
        otp,
        otpExpiry: expiry,
        isVerified: false,
      });
    } else {
      user.name = name;
      user.password = hash;
      user.otp = otp;
      user.otpExpiry = expiry;
    }

    await user.save();

   const sent = await sendOTP(user.email, user.name, otp);

    if (!sent) {
      return res.json({
        success: false,
        message: "Unable to send verification email.",
      });
    }

    res.json({
      success: true,
      message: "OTP sent successfully.",
    });
  } catch (error) {
    console.log(error);

    res.json({
      success: false,
      message: "Server Error",
    });
  }
};

// ================= VERIFY OTP =================

const verifyOTP = async (req, res) => {
  try {
    const { email, otp } = req.body;

    const user = await userModel.findOne({
      email: email.toLowerCase().trim(),
    });

    if (!user) {
      return res.json({
        success: false,
        message: "User not found.",
      });
    }

    if (user.otp !== otp) {
      return res.json({
        success: false,
        message: "Invalid OTP.",
      });
    }

    if (new Date() > user.otpExpiry) {
      return res.json({
        success: false,
        message: "OTP expired.",
      });
    }

    user.isVerified = true;
    user.otp = "";
    user.otpExpiry = null;

    await user.save();

    const token = createToken(user._id);

    res.json({
      success: true,
      token,
      message: "Email verified successfully.",
    });
  } catch (error) {
    console.log(error);

    res.json({
      success: false,
      message: "Server Error",
    });
  }
};

// ================= RESEND OTP =================

const resendOTP = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await userModel.findOne({
      email: email.toLowerCase().trim(),
    });

    if (!user) {
      return res.json({
        success: false,
        message: "User not found.",
      });
    }

    const otp = Math.floor(
      100000 + Math.random() * 900000
    ).toString();

    user.otp = otp;
    user.otpExpiry = new Date(Date.now() + 5 * 60 * 1000);

    await user.save();

  const sent = await sendOTP(user.email, user.name, otp);

    if (!sent) {
      return res.json({
        success: false,
        message: "Unable to resend OTP.",
      });
    }

    res.json({
      success: true,
      message: "OTP resent successfully.",
    });
  } catch (error) {
    console.log(error);

    res.json({
      success: false,
      message: "Server Error",
    });
  }
};

export {
  loginuser,
  registeruser,
  verifyOTP,
  resendOTP,
};