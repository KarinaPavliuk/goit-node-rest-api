import contactsService from "../services/contactsServices.js";
import HttpError from "../helpers/HttpError";

export const getAllContacts = async (req, res) => {
  const result = await contactsService.listContacts();

  res.status(200).json(result); // перевірити як працює статус
};

export const getOneContact = async (req, res) => {
  const { id } = req.params;
  const result = await contactsService.getContactById(id);

  if (!result) {
      throw HttpError(404); // перевірити чи працює меседж
  }

  res.status(200).json(result);
};

export const deleteContact = async (req, res) => {
  const { id } = req.params;
  const result = await contactsService.removeContact(id);

  if (!result) {
    throw HttpError(404);
  }
    
  res.status(200).json(result);
};

export const createContact = async (req, res) => {
  const result = await contactsService.addContact(req.body);

  // if (!result) {             // перевірити чи потрібно, бо код, що відпрацьовує помилку 
  //   throw HttpError(400)     // у helpers -> validateBody.js, застосований у routes
  // };

  res.status(201).json(result); 
};

export const updateContact = async (req, res) => { 
  const { id } = req.params;
  const result = await contactsService.updateContact(id, req.body);

  // if (!result) {
  //   throw HttpError(400, "Body must have at least one field")
  // };

  res.status(200).json(result);
};