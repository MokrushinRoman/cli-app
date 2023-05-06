const fs = require("fs").promises;
const path = require("path");
const { nanoid } = require("nanoid");
const { get } = require("http");

const contactsPath = path.join(`${__dirname}`, "db", "contacts.json");

const update = async (contacts) =>
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));

const getAll = async () => {
  const contacts = await fs.readFile(contactsPath);
  return JSON.parse(contacts);
};

const getOne = async (id) => {
  const contacts = await getAll();
  const contact = contacts.find(({ id: itemId }) => itemId === id);
  return contact || null;
};

const remove = async (id) => {
  const contacts = await getAll();
  const index = contacts.findIndex(({ id: contactId }) => id === contactId);
  if (index === -1) return null;
  const [result] = contacts.splice(index, 1);
  await update(contacts);
  return result;
};

const add = async (data) => {
  const contacts = await getAll();
  const newContact = { id: nanoid(), ...data };
  contacts.push(newContact);
  await update(contacts);
  return newContact;
};

module.exports = {
  getAll,
  getOne,
  remove,
  add,
};
