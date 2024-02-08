import "dotenv/config";
import jwt from "jsonwebtoken";

const jwt_secret_key = process.env.JWT_SECRET_KEY;


const auth = (req, res, next) => {
  try {
    const { token } = req.headers;
    if (token) {
      const decodedToken = jwt.verify(token, jwt_secret_key);
      if (decodedToken) {
        req.decodedToken = decodedToken;
        next();
      } else {
        res.status(401).json({ message: "Invalid token" })
      }
    } else {
      res.status(401).json({ message: "token not provided" });
    }
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error })
  }
}


export default auth;
