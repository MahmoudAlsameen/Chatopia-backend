import express from "express";
import "dotenv/config";
import morgan from "morgan";
import cors from "cors";
import connection from "./DB/connection.js";


const server = express();

server.use(cors());

if (process.env.MODE == "DEV") {
  server.use(morgan("dev"));
  console.log(`mode : ${process.env.MODE}`);
}

const port = process.env.PORT || 3000;
connection();
server.listen(port, () => console.log(`Server Started, listening to port ${port}`));
