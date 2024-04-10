import { Schema, model } from "mongoose";
import Joi from "joi";
import { handleMongooseError } from "../middlewares/handleMongooseError.js";

const contactSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Set name for contact'],
  },
  email: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true,
    // match: /^\d{10}$/
  },
  favorite: {
    type: Boolean,
    default: false    
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'user',
  },
}, {
  versionKey: false, timestamps: true
});

contactSchema.post("save", handleMongooseError);

const createContactSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.string().required(),
  favorite: Joi.boolean()
})

const updateContactSchema = Joi.object({
  name: Joi.string(),
  email: Joi.string(),
  phone: Joi.string(),
})

const updateFavoriteSchema = Joi.object({
    favorite: Joi.boolean().required(),
})

const schemas = {
    createContactSchema,
    updateContactSchema,
    updateFavoriteSchema,
}

const Contact = model("contact", contactSchema);

export { Contact, schemas };