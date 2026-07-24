import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import User from "../models/User.js"; // User model import
import mongoose from "mongoose";
import Car from "../models/Car.js";

// Generate JWT Token
const generateToken = (userId) => {
  return jwt.sign(
    { id: userId },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );
};

export const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Validation
    if (!name || !email || !password || password.length < 8) {
      return res.json({
        success: false,
        message: "Please fill all fields and password must be at least 8 characters.",
      });
    }

    // Check User Exists
    const userExists = await User.findOne({ email });

    if (userExists) {
      return res.json({
        success: false,
        message: "User already exists",
      });
    }

    // Hash Password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create User
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    // Generate Token
    const token = generateToken(user._id.toString());

    return res.json({
      success: true,
      message: "User registered successfully",
      token,
      user,
    });

  } catch (error) {
    console.log(error.message);

    return res.json({
      success: false,
      message: error.message,
    });
  }
};

// Login User
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check fields
    if (!email || !password) {
      return res.json({
        success: false,
        message: "Please enter email and password",
      });
    }

    // Find user
    const user = await User.findOne({ email });

    if (!user) {
      return res.json({
        success: false,
        message: "User not found",
      });
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.json({
        success: false,
        message: "Invalid credentials",
      });
    }

    // Generate Token
    const token = generateToken(user._id.toString());

    return res.json({
      success: true,
      message: "Login successful",
      token,
      user,
    });

  } catch (error) {
    console.log(error.message);

    return res.json({
      success: false,
      message: error.message,
    });
  }
};
// / get all cars for the   fromtend

export const getCars = async (req, res) => {
  try {
    const cars = await Car.find({ isAvaliable: true });

    res.status(200).json({
      success: true,
      cars,
    });
  } catch (error) {
    console.log(error.message);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
// get user data using data

export const getUserData = async (req, res) => {
  try {
    const { user } = req;

    res.json({
      success: true,
      user,
    });
  } catch (error) {
    console.log(error.message);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};