import fs from "fs/promises";
// Location based variables
const DIR = __dirname;
const ENV_PATH = `${DIR}/../.env`;
const SAMPLE_ENV = `${DIR}/../.env.sample`;
const generateEnvSample = async (excludedKeys?: string[]) => {
  const options: { encoding: BufferEncoding } = { encoding: "utf-8" };
  // Reading sample env file. Only throws an error if not created
  const sampleEnvFile = await fs.readFile(SAMPLE_ENV, options).catch(() => {});
  // Read env file
  const envFile = await fs.readFile(ENV_PATH, options);
  // Extract keys from file
  const lines = envFile.trim().split("\n");
  let keys = lines.map((line) => line.split("=")[0]);
  // Excluding keys if they are specified
  if (excludedKeys) keys = keys.filter((key) => !excludedKeys.includes(key));
  // Format keys for file
  const sampleContent = keys.map((k) => `${k}=`).join("\n");
  const isSampleNew = sampleEnvFile === sampleContent ? false : true;
  // Write keys to '.env.sample' file
  if (isSampleNew) {
    await fs.writeFile(SAMPLE_ENV, sampleContent);
    // Console Message
    return console.log("Successfully created env sample file");
  }
  console.log("Env Sample Not Changed");
};
export default generateEnvSample;
