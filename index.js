import cors from "cors";
import express from "express";
import morgan from "morgan";
import connection from "./DB/connection.js";
import { load_env } from "./custom_modules/load_.env.js";
import userRoutes from "./modules/user/user.routes.js";

load_env();
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
