import express from "express";
import morgan from "morgan";
import cors from "cors";
import multer from "multer";
import path from "path";
import fs from "fs/promises";
import { nanoid } from "nanoid";
import contactsRouter from "./routes/contactsRouter.js";

const app = express();

app.use(morgan("tiny"));
app.use(cors());
app.use(express.json());
app.use(express.static("public"));

const tempDir = path.join(process.cwd(), "temp");

const multerConfig = multer.diskStorage({
  destination: tempDir,
  filename: (req, file, cb) => {
    cb(null, file.originalname)
  }
}) 

const upload = multer({
  storage: multerConfig,
})

const contacts = [];

// app.use("/api/contacts", contactsRouter);
app.get("/api/contacts", (req, res) => {
  res.json(contacts)
})

const contactsDir = path.join(process.cwd(), "public", "contacts")

// upload.fields([{name: "photo", maxCount: 1}, {name: "subphoto", maxCount: 2}]) - якщо потрібно отримати файли з декількох полів, створюється масив об'єктів, name значення - це назва поля в якому має бути файл, maxCount - максимальна кільк файлів, яку ми очікуємо
// upload.array("photo", 8); - якщо передається масив файлів, і вказується максимальна кільк ел масиву
app.post("/api/contacts", upload.single("photo"), async (req, res) => {
  const { path: tempUpload, originalname } = req.file;
  const resultUpload = path.join(contactsDir, originalname);
  await fs.rename(tempUpload, resultUpload);

  const photo = path.join("contacts", originalname);
  const newContact = {
    id: nanoid(),
    ...req.body,
    photo,
  };
  contacts.push(newContact);

  res.status(201).json(newContact);
})

app.use((_, res) => {
  res.status(404).json({ message: "Route not found" });
});

app.use((err, req, res, next) => {
  const { status = 500, message = "Server error" } = err;
  res.status(status).json({ message });
});

app.listen(3000, () => {
  console.log("Server is running. Use our API on port: 3000");
});