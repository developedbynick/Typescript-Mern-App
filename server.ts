import "dotenv/config";
import generateEnvSample from "./utils/generateEnvSample";
import app from "./app";
import env from "./utils/validateEnv";
import mongoose from "mongoose";
if (env.isDev) generateEnvSample();
const connectToDbAndStartApp = async () => {
  const { connection } = await mongoose.connect(env.MONGO);
  console.log(
    `Successfully connected to '${connection.name}' database '@${connection.host}'.`
  );
  app.listen(env.PORT, () => {
    console.log(`Server running on port ${env.PORT}`);
  });
};

connectToDbAndStartApp();
