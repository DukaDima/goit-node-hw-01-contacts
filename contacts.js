const fs = require("fs/promises");
const path = require("path");
const crypto = require("crypto");

const contactsPath = path.join(__dirname, "db", "contacts.json");

const contactsData = async () => {
  const result = await fs.readFile(contactsPath, "utf8");
  return JSON.parse(result);
};

const listContacts = async () => {
  return await contactsData();
};

const getContactById = async (contactId) => {
  const contacts = await contactsData();
  const [result] = contacts.filter(
    (contact) => String(contact.id) === contactId
  );
  return result;
};

const removeContact = async (contactId) => {
  const contacts = await contactsData();
  const newContacts = contacts.filter(
    (contact) => String(contact.id) !== contactId
  );
  if (newContacts.length === contacts.length) {
    return null;
  } else {
    await fs.writeFile(contactsPath, JSON.stringify(newContacts, null, 2));
    return await contactsData();
  }
};

const addContact = async (name, email, phone) => {
  const contacts = await contactsData();
  const newContact = { id: crypto.randomUUID(), name, email, phone };
  contacts.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return newContact;
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
