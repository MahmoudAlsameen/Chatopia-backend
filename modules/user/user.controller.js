import "dotenv/config";
import userModel from "../../DB/models/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";


const jwt_secret_key = process.env.JWT_SECRET_KEY;
const saltRounds = 4;


const userRegister = async (req, res) => {
  try {
    const hashedPassword = bcrypt.hashSync(req.body.password, saltRounds);
    const addedUser = await userModel.create({ ...req.body, password: hashedPassword });
    res.status(201).json({ message: "user added successfully" });
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error })
  }
}


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
        res.status(401).json({ message: "Invalid email or password" })
      }
    } else {
      res.status(404).json({ message: "User not found" })
    }
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error })
  }
}









export { userRegister, userLogin }
