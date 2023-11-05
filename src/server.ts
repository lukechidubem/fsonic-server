import mongoose from "mongoose";
import http from "http";
import dotenv from "dotenv";
import app from "./app";

dotenv.config();

const server = http.createServer(app);

const DATABASE = process.env.DATABASE || "";
const PASSWORD = process.env.DATABASE_PASSWORD || "";

const DB = DATABASE.replace("<PASSWORD>", PASSWORD);

mongoose
  .connect(DB, {
    retryWrites: true,
    w: "majority",
  })
  .then(() => console.log("DB connection successful!"));

const port = process.env.PORT || 4000;

server.listen(port, () => {
  console.log(`App running on port ${port}...`);
});
