import express from "express";
import "dotenv/config";
import morgan from "morgan";
import cors from "cors";
import connection from "./DB/connection.js";
import userRoutes from "./modules/user/user.routes.js";



const port = process.env.PORT || 3000;
const mode = process.env.MODE;
const server = express();

server.use(cors());
server.use(express.json());
server.use('/user', userRoutes);




if (mode == "DEV") {
  server.use(morgan("dev"));
  console.log(`mode : ${mode}`);
}

connection();
server.listen(port, () => console.log(`Server Started, listening to port ${port}`));
