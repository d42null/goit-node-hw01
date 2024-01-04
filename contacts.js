const fs = require("fs/promises");
const { nanoid } = require("nanoid");
const path = require("path");
const contactsPath = path.join(__dirname, "db/contaсts.json");

const listContacts = async () => JSON.parse(await fs.readFile(contactsPath));
const getContactById = async (contactId) =>
  (await listContacts()).find((x) => x.id === contactId) || null;
const removeContact = async (contactId) => {
  const contacts = await listContacts();
  const index = contacts.findIndex((x) => x.id === contactId);
  if (index === -1) return null;
  const [removedContact] = contacts.splice(index, 1);
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return removedContact;
};

const addContact = async (name, email, phone) => {
  const contacts = await listContacts();
  const newContact = { id: nanoid(), name, email, phone };
  contacts.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return newContact;
};
module.exports = { listContacts, getContactById, removeContact, addContact };
