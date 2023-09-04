import { cleanEnv, port, url } from "envalid";

export default cleanEnv(process.env, {
  MONGO: url({ default: "mongodb://127.0.0.1:27017" }),
  PORT: port(),
});
