import jwt from "jsonwebtoken";
import "dotenv/config";

const secret_key = process.env.JWT_SECRET_KEY;


const auth = (req, res, next) => {

  let { token } = req.headers;
  if (token) {
    try {
      let decodedToken = jwt.verify(token, secret_key);
      req.decodedToken = decodedToken;
      next();
    } catch (error) {
      res.status(401).json({ message: "invalid token" });
    }
  } else {
    return res.status(401).json({ message: "token not provided" });
  }

}


export default auth;
