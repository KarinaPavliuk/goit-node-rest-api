import express from "express";
import morgan from "morgan";
import cors from "cors";
import multer from "multer";
import path from "path";
import contactsRouter from "./routes/contactsRouter.js";

const app = express();

app.use(morgan("tiny"));
app.use(cors());
app.use(express.json());

const tempDir = path.join(process.cwd(), "temp");
const contactsPath = path.join(process.cwd(), "./db/contacts.json");

const multerConfig = multer.diskStorage({
  destination: tempDir,
  filename: (req, file, cb) => {
    cb(null, file.originalname)
  }
}) 

const upload = multer({
  storage: multerConfig,
})

// app.use("/api/contacts", contactsRouter);
app.get("/api/contacts", (req, res) => {
  res.json(contactsPath)
})

app.post("/api/contacts", upload.single("photo"), async (req, res) => {
  console.log(req.body);
  console.log(req.file);
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