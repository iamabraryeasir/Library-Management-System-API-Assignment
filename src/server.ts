import app from './app';
import config from './app/config';
import { connectToMongoDB } from './app/config/db.config';

async function main() {
  try {
    await connectToMongoDB();

    app.listen(config.port, () => {
      console.log(`Server is running at port: ${config.port}`);
    });
  } catch (err) {
    console.log('Error running the server!!', err);
    process.exit(1);
  }
}
main();
