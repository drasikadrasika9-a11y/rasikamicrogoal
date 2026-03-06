import express from "express";
import bcrypt from "bcryptjs";

import userValidation from "../validation/userValidation.js";
import userModel from "../model/UserModel.js";
import generateToken from "../utils/generatetoken.js";

const router = express.Router();

// SIGNUP
router.post("/signup", async (req, res, next) => {
  try {
    const { error } = userValidation.validate(req.body);

    if (error) {
      return res.status(400).json({
        success: false,
        message: error.details[0].message,
      });
    }

    const { name, email, password } = req.body;

    const exist = await userModel.findOne({ email });

    if (exist) {
      return res.status(400).json({
        success: false,
        message: "User already exists",
      });
    }

    const hashpassword = await bcrypt.hash(password, 10);

    const user = new userModel({
      name,
      email,
      password: hashpassword,
    });

    await user.save();

    const token = generateToken(user._id);

    res.status(201).json({
      success: true,
      message: "User created successfully",
      token,
      data: user,
    });
  } catch (err) {
    next(err);
  }
});

// LOGIN
router.post("/login", async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required",
      });
    }

    const user = await userModel.findOne({ email });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Wrong password",
      });
    }

    const token = generateToken(user._id);

    res.status(200).json({
      success: true,
      message: "Login successful",
      token,
      data: user,
    });
  } catch (error) {
    next(error);
  }
});

export default router;