import bcrypt from "bcrypt";
import "dotenv/config";
import jwt from "jsonwebtoken";
import userModel from "../../DB/models/user.model.js";

const jwt_secret_key = process.env.JWT_SECRET_KEY;
const saltRounds = 4;

const userRegister = async (req, res) => {
  try {
    const hashedPassword = bcrypt.hashSync(req.body.password, saltRounds);
    const addedUser = await userModel.create({
      ...req.body,
      password: hashedPassword,
    });
    res.status(201).json({ message: "User added successfully" });
  } catch (error) {
    if (error.code === 11000) {
      if (error.keyPattern.email) {
        // Handle duplicate email error
        const { email } = error.keyValue;
        res
          .status(409)
          .json({ message: `Email '${email}' is already registered` });
      } else if (error.keyPattern.userName) {
        // Handle duplicate username error
        const { userName } = error.keyValue;
        res
          .status(409)
          .json({ message: `Username '${userName}' is already in use` });
      } else {
        // Generic duplicate key error
        console.log("Duplicate key error:", error);
        res.status(409).json({ message: "Duplicate key error", error });
      }
    } else {
      // Handle other errors
      console.log("Internal server error:", error);
      res.status(500).json({ message: "Internal server error", error });
    }
  }
};

const userLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const queriedUser = await userModel.findOne({ email });
    if (queriedUser) {
      const matched = bcrypt.compareSync(password, queriedUser.password);
      if (matched) {
        const token = jwt.sign({ id: queriedUser.id }, jwt_secret_key);
        res.status(200).json({ message: "Logged in successfully", token });
      } else {
        res.status(401).json({ message: "Invalid email or password" });
      }
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error });
  }
};

const userUpdate = async (req, res) => {
  try {
    const userId = req.decodedToken.id;
    const user = await userModel.findById(userId);
    if (user) {
      if (req.body.password) {
        const hashedPassword = bcrypt.hashSync(req.body.password, saltRounds);
        const udpatedUser = await userModel.findByIdAndUpdate(
          userId,
          { ...req.body, password: hashedPassword },
          { new: true }
        );
      } else {
        const udpatedUser = await userModel.findByIdAndUpdate(
          userId,
          { ...req.body },
          { new: true }
        );
      }
      res.status(200).json({ message: "User updated successfully" });
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error });
  }
};

const userDelete = async (req, res) => {
  try {
    const userId = req.decodedToken.id;
    const user = await userModel.findById(userId);
    if (user) {
      const matched = bcrypt.compareSync(req.body.password, user.password);
      if (matched) {
        const deletedUser = await userModel.findByIdAndDelete(userId);
        res.status(200).json({ message: "User deleted successfully" });
      } else {
        res.status(401).json({ message: "Invalid password" });
      }
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error });
  }
};

export { userDelete, userLogin, userRegister, userUpdate };
