
import app from './app';
import { connectDb } from './database/connectDb';

const PORT = process.env.PORT || 3000;

const mainServer = async () => {
  try {
    app.listen(PORT, () => {
      console.log(`Example app listening on http://localhost:${PORT}`);
    });
    await connectDb(); // datbase function
  } catch (error) {
    console.log('error:', error);
  }
};


mainServer();
