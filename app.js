import express from "express";
import morgan from "morgan";
import cors from "cors";
import dotenv from "dotenv";

import contactsRouter from "./routes/contactsRouter.js";

dotenv.config();

//some changing in file on 03-mongodb branch
// import mongoose from "mongoose";

// const DB_HOST = "mongodb+srv://karina:hIwHs1SGV2XMG3KR@cluster0.xsyx2d7.mongodb.net/db-contacts?retryWrites=true&w=majority&appName=Cluster0";

// mongoose.set('strictQuery', true);

// mongoose.connect(DB_HOST)
//   .then(() => console.log("Database connection successful"))
//   .catch(error => console.log(error.message));
//---------------

const app = express();

app.use(morgan("tiny"));
app.use(cors());
app.use(express.json());

app.use("/api/contacts", contactsRouter);

app.use((_, res) => {
  res.status(404).json({ message: "Route not found" });
});

app.use((err, req, res, next) => {
  const { status = 500, message = "Server error" } = err;
  res.status(status).json({ message });
});

export {app};