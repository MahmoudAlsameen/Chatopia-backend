import express from "express";
import "dotenv/config";
import morgan from "morgan";
import cors from "cors";

const server = express();

server.use(cors());

if (process.env.MODE == "DEV") {
  server.use(morgan("dev"));
  console.log(`mode : ${process.env.MODE}`);
}


const port = process.env.PORT || 3000;
server.listen(port, () => console.log(`Server Started, listening to port ${port}`));
