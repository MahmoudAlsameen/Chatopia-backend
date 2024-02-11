// add the environment variable to the app
import dotenv from "dotenv";

export const load_env = function () {
  let configPath, result;
  switch (process.env.NODE_ENV) {
    case "prod":
      configPath = ".env.prod";
      result = dotenv.config({ path: configPath });
      process.env = {
        ...process.env,
        ...result,
      };
      break;
    case "test":
      configPath = ".env.test";
      result = dotenv.config({ path: configPath });
      process.env = {
        ...process.env,
        ...result,
      };
      break;
    default:
      configPath = ".env.dev";
      result = dotenv.config({ path: configPath });
      process.env = {
        ...process.env,
        ...result,
      };
      break;
  }
};
