import express from "express";
import logger from "morgan";
import cors from "cors";
import dotenv from "dotenv";
import multer from "multer";
import path from "path";

import authRouter from "./routes/authRouter.js";
import contactsRouter from "./routes/contactsRouter.js";

dotenv.config();

const app = express();

const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short'

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());

const tempDir = path.join(process.cwd(), "temp");

const multerConfig = multer.diskStorage({
  destination: tempDir,
  // filename: (req, file, cb) => {
  //   cb(null, file.originalname);
  // }
})

const upload = multer({
  storage: multerConfig,
})

app.use("/api/auth", upload.single("photo"), authRouter)
app.use("/api/contacts", contactsRouter);

app.use((_, res) => {
  res.status(404).json({ message: "Route not found" });
});

app.use((err, req, res, next) => {
  const { status = 500, message = "Server error" } = err;
  res.status(status).json({ message });
});

export { app, upload };