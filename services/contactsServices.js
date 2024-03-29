import * as fs from "node:fs/promises";
import path from "node:path";
import { nanoid } from "nanoid";

const contactsPath = path.join(process.cwd(), 'contacts.json'); 

async function listContacts() {
  const data = await fs.readFile(contactsPath);
  return JSON.parse(data);
}

async function getContactById(contactId) {
  const contacts = await listContacts();
  const result = contacts.find(item => item.id === contactId);
  return result || null;
}

async function removeContact(contactId) {
  const contacts = await listContacts();
    const index = contacts.findIndex(item => item.id === contactId);
    if(index === -1){
        return null;
    }
    const [result] = contacts.splice(index, 1);
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
    return result;
}

async function addContact({ name, email, phone }) { // перевірити чи треба деструктурувати
  const contacts = await listContacts();
    const newContact = {
      id: nanoid(),
      name,
      email,
      phone,
    }
    contacts.push(newContact);
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
    return newContact;
}

async function updateContactById(id, { name, email, phone }) {// перевірити чи треба деструктурувати
  const contacts = await listContacts();
  const index = contacts.findIndex(item => item.id === id);
  if (index === -1) {
    return null;
  }
  contacts[index] = { id, name, email, phone };
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return contacts[index];
}
// const updateById = async(id, data) => {
//     const books = await getAll();
//     const index = books.findIndex(item => item.id === id);
//     if(index === -1){
//         return null;
//     }
//     books[index] = {id, ...data};
//     await fs.writeFile(booksPath, JSON.stringify(books, null, 2));
//     return books[index];
// }

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContactById,
}