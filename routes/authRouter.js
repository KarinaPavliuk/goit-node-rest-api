import express from "express";
import validateBody from "../helpers/validateBody.js";
import { schemas } from "../models/user.js";
import { ctrlWrapper } from "../helpers/ctrlWrapper.js";
import { register, login, getCurrent, logout } from "../controllers/authControllers.js";
import authenticate from "../middlewares/authenticate.js";

const authRouter = express.Router();

authRouter.post("/register", validateBody(schemas.registerSchema), ctrlWrapper(register));

authRouter.post("/login", validateBody(schemas.loginSchema), ctrlWrapper(login));

authRouter.get("/current", authenticate, ctrlWrapper(getCurrent));

authRouter.post("/logout", authenticate, ctrlWrapper(logout));

export default authRouter;