import app from "./app";
import "dotenv/config";
import envConfig from "./config/envConfig";
import { connectMongo } from "./config/mongo";

connectMongo()
  .then(() => {
    app.listen(envConfig.PORT, () => {
      console.log(`Server is running on http://localhost:${envConfig.PORT}`);
    });
  })
  .catch(err => console.log("Mongo Error: ", err));
