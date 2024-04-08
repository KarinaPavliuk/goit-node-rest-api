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
import { isValidId } from "../middlewares/isValidId.js";
import { schemas } from "../services/contact.js";

const contactsRouter = express.Router();

contactsRouter.get("/", ctrlWrapper(getAllContacts));

contactsRouter.get("/:id", isValidId, ctrlWrapper(getOneContact));

contactsRouter.delete("/:id", isValidId, ctrlWrapper(deleteContact));

contactsRouter.post("/", validateBody(schemas.createContactSchema), ctrlWrapper(createContact));

contactsRouter.put("/:id", isValidId, validateBody(schemas.updateContactSchema), ctrlWrapper(updateContact));

contactsRouter.patch("/:id/favorite", isValidId, validateBody(schemas.updateFavoriteSchema), ctrlWrapper(updateFavorite));

export default contactsRouter;