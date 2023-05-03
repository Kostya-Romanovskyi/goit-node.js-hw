const fs = require("fs/promises");
const path = require("path");
const nanoid = require("nanoid");

const contactsPath = path.join(__dirname, "db", "contacts.json");

async function listContacts() {
  const contactsData = await fs.readFile(contactsPath, "utf-8");
  return JSON.parse(contactsData);
}

async function getContactById(id) {
  const contactId = String(id);
  const contacts = await listContacts();
  const result = contacts.find((contact) => contact.id === contactId);
  return result || null;
}

async function removeContact(id) {
  const contactId = String(id);
  const contacts = await listContacts();
  const index = contacts.findIndex((contact) => contact.id === contactId);
  if (index === -1) {
    return null;
  }

  const [result] = contacts.splice(index, 1);
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return result;
}

async function addContact(name, email, phone) {
  const contacts = await listContacts();

  const newContact = {
    id: nanoid.urlAlphabet,
    name,
    email,
    phone,
  };

  contacts.push(newContact);

  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return console.log(newContact);
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
