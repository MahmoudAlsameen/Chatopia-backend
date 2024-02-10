import cors from "cors";
import "dotenv/config";
import express from "express";
import morgan from "morgan";
import connection from "./DB/connection.js";
import userRoutes from "./modules/user/user.routes.js";

const port = process.env.PORT || 3000;
const envMorganLogging = process.env.MORGAN_LOGGING;
const server = express();

server.use(cors());
server.use(express.json());
if (envMorganLogging) {
  server.use(morgan(envMorganLogging));
  console.log(`Morgan_Logging mode: ${envMorganLogging}`);
}
server.use("/user", userRoutes);

connection();
server.listen(port, () =>
  console.log(`Server Started, listening to port ${port}`)
);
