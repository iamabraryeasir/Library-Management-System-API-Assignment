import "dotenv/config";

const config = {
  port: process.env.PORT,
  dbUri: `${process.env.MONGODB_URI}/${process.env.MONGODB_NAME}`,
};

export default config;
