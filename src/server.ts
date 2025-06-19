import app from "./app";
import config from "./config";
import { connectToMongoDB } from "./config/db.config";

async function main() {
  try {
    await connectToMongoDB();

    app.listen(config.port, () => {
      console.log(`Server is running at port: ${config.port}`);
    });
  } catch (err) {
    console.log("Error running the server!!", err);
    process.exit(1);
  }
}
main();
