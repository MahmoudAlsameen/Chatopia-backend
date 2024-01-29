import mongoose from 'mongoose';
import 'dotenv/config'



console.log("mongo string",process.env.MONGO_DB_URI)
const connection = () => {
  mongoose
    .connect(process.env.MONGO_DB_URI)
    .then((data) => {
      console.log(`Database Connected ${data.connection.host}`);

    })
    .catch((err) => {
      console.log(err);
    })
};

export default connection;
