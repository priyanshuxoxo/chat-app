import { emailValidate } from "../utils/email.validation.js";
import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import { generateToken } from "../lib/generateJWT.js";
export const signup = async (req, res) => {
  // Registration logic

  const { fullName, email, password, profilePic } = req.body;
  try {
    if (!fullName || !email || !password) {
      return res.status(400).send({ message: "All fields are required" });
    }
    if (password.length < 6) {
      return res
        .status(400)
        .send({ message: "Password must be at least 6 characters" });
    }
    if (!emailValidate(email)) {
      res.status(400).json({ message: "email is invalid" });
    }
    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).send({ message: "User already exists" });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = new User({
      email,
      password: hashedPassword,
      fullName,
    });
    if (newUser) {
      //generate jwt token
      generateToken(newUser._id, res);
      await newUser.save();
      res.status(201).json({
        _id: newUser._id,
        fullName: newUser.fullName,
        email: newUser.email,
        profilePic: newUser.profilePic,
      });
    } else {
      res.send(400).json({ message: "Inavlid user data" });
    }
  } catch (error) {
    console.log("Error in signup controller : ", error.message);
  }
};
export const login = (req, res) => {
  // Login logic
  res.send("User logged in");
};

export const logout = (req, res) => {
  // Logout logic
  res.send("User logged out");
};
