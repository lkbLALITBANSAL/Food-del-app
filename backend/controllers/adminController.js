import adminModel from "../Models/adminModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import validator from "validator";

// Generate JWT for an authenticated admin
const createToken = (id) => {
  return jwt.sign(
    { id, role: "admin" },
    process.env.JWT_SECRET,
    { expiresIn: "1d" }
  );
};

// ONE-TIME ADMIN SIGNUP
const adminSignup = async (req, res) => {
  try {
    const { name, email, password, setupKey } = req.body;

    if (!name || !email || !password || !setupKey) {
      return res.status(400).json({
        success: false,
        message: "All fields are required."
      });
    }

    // Only the person who knows this secret can initialize admin access.
    if (
      !process.env.ADMIN_SETUP_KEY ||
      setupKey !== process.env.ADMIN_SETUP_KEY
    ) {
      return res.status(403).json({
        success: false,
        message: "Invalid admin setup key."
      });
    }

    // Allow signup only when no admin exists.
    const existingAdmin = await adminModel.findOne({});

    if (existingAdmin) {
      return res.status(403).json({
        success: false,
        message: "Admin signup is disabled."
      });
    }

    const normalizedEmail = email.toLowerCase().trim();

    if (!validator.isEmail(normalizedEmail)) {
      return res.status(400).json({
        success: false,
        message: "Enter a valid email."
      });
    }

    if (
      !validator.isStrongPassword(password, {
        minLength: 8,
        minLowercase: 1,
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 1
      })
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Password must have 8+ characters, uppercase, lowercase, number and symbol."
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const admin = await adminModel.create({
      name: name.trim(),
      email: normalizedEmail,
      password: hashedPassword
    });

    const token = createToken(admin._id.toString());

    return res.status(201).json({
      success: true,
      message: "Admin created successfully.",
      token,
      admin: {
        id: admin._id,
        name: admin.name,
        email: admin.email
      }
    });
  } catch (error) {
    console.error("Admin signup error:", error);

    return res.status(500).json({
      success: false,
      message: "Unable to create admin."
    });
  }
};

// ADMIN LOGIN
const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required."
      });
    }

    const normalizedEmail = email.toLowerCase().trim();

    const admin = await adminModel.findOne({
      email: normalizedEmail
    });

    if (!admin) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password."
      });
    }

    const isMatch = await bcrypt.compare(
      password,
      admin.password
    );

    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password."
      });
    }

    const token = createToken(admin._id.toString());

    return res.json({
      success: true,
      message: "Login successful.",
      token,
      admin: {
        id: admin._id,
        name: admin.name,
        email: admin.email
      }
    });
  } catch (error) {
    console.error("Admin login error:", error);

    return res.status(500).json({
      success: false,
      message: "Unable to log in."
    });
  }
};

export { adminSignup, adminLogin };