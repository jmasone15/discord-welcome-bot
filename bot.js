const fs = require("fs");
const Discord = require("discord.js");
const { prefix, token } = require('./config.json');

// Create a new instance of the discord client
const client = new Discord.Client();

// Creates command collection based off of the commands folder.
client.commands = new Discord.Collection();

const commandFiles = fs.readdirSync("./commands").filter(file => file.endsWith(".js"));

for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    client.commands.set(command.name, command);
};

// Ready Event
// This event will only trigger one time after logging in.
client.once("ready", () => {
    console.log(`${client.user.username} is running.`);
});

client.on("message", message => {
    // Validation of prefix and non bot message.
    if (!message.content.startsWith(prefix) || message.author.bot) return;

    // Gets the arguments that come after the command message.
    const args = message.content.slice(prefix.length).trim().split(/ +/);
    const command = args.shift().toLowerCase();

    // If there is no command with the input name, the function ends.
    if (!client.commands.has(command)) return;

    // Get the correct command from the collection and execute the response.
    try {
        client.commands.get(command).execute(message, args);
    } catch (err) {
        console.error(err);
        message.reply("There was an error trying to execute that command!")
    }
});

// Logs the bot in to be online
client.login(token);

