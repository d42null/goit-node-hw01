const contacts = require("./contacts");
const { Command } = require("commander");
const program = new Command();
program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse(process.argv);
const argv = program.opts();

const invokeAction = async ({ action, id, name, email, phone }) => {
  switch (action) {
    case "list":
      return console.log(await contacts.listContacts());
    case "get":
      return console.log(await contacts.getContactById(id));
    case "add":
      return console.log(await contacts.addContact(name, email, phone));
    case "remove":
      return console.log(await contacts.removeContact(id));
    default:
      console.warn("Unknown action type!");
  }
};
invokeAction(argv);
