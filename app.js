import express from "express";
import logger from "morgan";
import cors from "cors";
import dotenv from "dotenv";
import authRouter from "./routes/authRouter.js";
import contactsRouter from "./routes/contactsRouter.js";
import Jimp from "jimp";

dotenv.config();

const app = express();

const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short'

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());
app.use(express.static("public"));

app.use("/api/auth", authRouter)
app.use("/api/contacts", contactsRouter);

app.use((_, res) => {
  res.status(404).json({ message: "Route not found" });
});

app.use((err, req, res, next) => {
  const { status = 500, message = "Server error" } = err;
  res.status(status).json({ message });
});

(async function () {
  
  const image = await Jimp.read("images/person1.png");

  image.resize(250, 250);

  image.write("images/edited-person1.png");
})();

export default app;
