import * as dotenv from "dotenv";
import { createConnection, ConnectionOptions } from "typeorm";

import { User } from "../models/User";
import { Post } from "../models/Post";

dotenv.config(); // read key-value pairs from .env

const makeCXNtoDB = async () => {
  if (
    !(
      "DB_PORT" in process.env ||
      "DB_USERNAME" in process.env ||
      "DB_PASSWORD" in process.env ||
      "DB_NAME" in process.env
    )
  ) {
    console.log("Missing .env props, cxn can't be made.");
  } else {
    const CXNOptions: ConnectionOptions = {
      type: "postgres",
      host: process.env.DB_HOST || "localhost",
      port: Number(process.env.DB_PORT) || 5432,
      username: process.env.DB_USERNAME ?? "postgres",
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: [User, Post],
      synchronize: true,
      logging: true
    };

    try {
      await createConnection(CXNOptions);
      console.log("Connect to DB OK!");
    } catch (error) {
      console.log("Attempt to make a cxn to DB failed ...");
      throw new Error(error);
    }
  }
};

export default makeCXNtoDB;
