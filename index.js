const { getAll, getOne, add, remove } = require("./contacts");
const { program } = require("commander");
program
  .option("-a, --action <type>")
  .option("-p,--phone <type>")
  .option("-e,--email <type>")
  .option("-n,--name <type>")
  .option("-i,--id <type>");
program.parse();
const option = program.opts();

const invokeAction = async ({ action, phone, email, name, id }) => {
  switch (action) {
    case "getAll":
      const allContacts = await getAll();
      return console.log(allContacts);
    case "getOne":
      const contact = await getOne(id);
      return console.log(contact);
    case "remove":
      const deleteContact = await remove(id);
      return console.log(deleteContact);
    case "add":
      const newContact = await add({ name, email, phone });
      return console.log(newContact);
    default:
      return console.warn("\x1B[31m Unknown action type!");
  }
};

invokeAction(option);

/*
const yargs = require("yargs");
const { hideBin } = require("yargs/helpers");

const arr = hideBin(process.argv);
const { argv } = yargs(arr);
invokeAction(argv);
 */
