const { Command } = require("commander");
const chalk = require("chalk");
const {
  listContacts,
  addContact,
  getContactById,
  removeContact,
} = require("./contacts");

const program = new Command();
program
  .requiredOption("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse(process.argv);

const argv = program.opts();

(async ({ action, id, name, email, phone }) => {
  try {
    switch (action) {
      case "list":
        const contacts = await listContacts();
        console.log(contacts);
        break;

      case "get":
        const contactById = await getContactById(id);
        if (contactById) {
          console.log(chalk.greenBright("Contact found"));
          console.log(contactById);
        } else {
          console.log(chalk.redBright("Contact not found"));
        }
        break;

      case "add":
        const contact = await addContact(name, email, phone);
        console.log(chalk.yellow("Add new contact"));
        console.log(contact);
        break;

      case "remove":
        const newContacts = await removeContact(id);
        if (newContacts) {
          console.log(chalk.cyan("Found and removed one contact"));
          console.log(newContacts);
        } else {
          console.log(chalk.redBright("Contact not found"));
        }

        break;

      default:
        console.warn(chalk.red("Unknown action type!"));
    }
  } catch (error) {
    console.error(chalk.red(error.message));
  }
})(argv);
