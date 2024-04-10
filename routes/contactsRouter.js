import express from "express";
import {
  getAllContacts,
  getOneContact,
  deleteContact,
  createContact,
  updateContact,
  updateFavorite
} from "../controllers/contactsControllers.js";
import { ctrlWrapper } from "../helpers/ctrlWrapper.js";
import validateBody from "../helpers/validateBody.js";
import isValidId from "../middlewares/isValidId.js";
import { schemas } from "../models/contact.js";
import authenticate from "../middlewares/authenticate.js";

const contactsRouter = express.Router();

contactsRouter.get("/", authenticate, ctrlWrapper(getAllContacts));

contactsRouter.get("/:id", authenticate, isValidId, ctrlWrapper(getOneContact));

contactsRouter.delete("/:id", authenticate, isValidId, ctrlWrapper(deleteContact));

contactsRouter.post("/", authenticate, validateBody(schemas.createContactSchema), ctrlWrapper(createContact));

contactsRouter.put("/:id", authenticate, isValidId, validateBody(schemas.updateContactSchema), ctrlWrapper(updateContact));

contactsRouter.patch("/:id/favorite", authenticate, isValidId, validateBody(schemas.updateFavoriteSchema), ctrlWrapper(updateFavorite));

export default contactsRouter;