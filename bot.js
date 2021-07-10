const fs = require("fs");
const Discord = require("discord.js");
const { prefix, token } = require('./config.json');

// Create a new instance of the discord client
const client = new Discord.Client();

// Creates command collection based off of the commands folder.
client.commands = new Discord.Collection();
client.cooldowns = new Discord.Collection();

const commandFolders = fs.readdirSync("./commands");

for (const folder of commandFolders) {
    const commandFiles = fs.readdirSync(`./commands/${folder}`).filter(file => file.endsWith(".js"));
    for (const file of commandFiles) {
        const command = require(`./commands/${folder}/${file}`);
        client.commands.set(command.name, command);
    }
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
    const commandName = args.shift().toLowerCase();

    // If there is no command with the input name, the function ends.
    if (!client.commands.has(commandName)) return;

    // Gets the command from the collection and sets it to a constant.
    const command = client.commands.get(commandName);

    // Validation for guild only commands.
    if (command.guildOnly && message.channel.type === "dm") {
        return message.reply("I can't execute that command inside DMs!");
    }

    // If the arguments property is true in the command, this check runs to see if the author provided arguments in their command.
    if (command.args && !args.length) {
        let reply = `You didn't provide any arguments, ${message.author}!`;

        // If there is a proper usage, we send it to the author.
        if (command.usage) {
            reply += `\nThe proper usage would be: \`${prefix}${command.name} ${command.usage}\``;
        }

        return message.channel.send(reply);
    }

    // Cooldowns for commands
    const { cooldowns } = client;

    // Check to see if the cooldown collection has an entry for the command being used atm.
    // If not, add a new entry with the command as an empty collection.
    if (!cooldowns.has(command.name)) {
        cooldowns.set(command.name, new Discord.Collection());
    }

    // Current timestamp
    const now = Date.now();

    // Reference to cooldowns collection.
    const timestamps = cooldowns.get(command.name);

    // The specified cooldown amount from the command file or 3 converted to seconds.
    const cooldownAmount = (command.cooldown || 3) * 1000;

    // If the author has used the command in this session, inform the user they need to wait before using the command again.
    if (timestamps.has(message.author.id)) {
        const expirationTime = timestamps.get(message.author.id) + cooldownAmount;

        // Calculate the time left and tell the user how long they have to wait.
        if (now < expirationTime) {
            const timeLeft = (expirationTime - now) / 1000;
            return message.reply(`Please wait ${timeLeft.toFixed(1)} more second(s) before reusing the \`${command.name}\` command.`);
        }
    }

    // Set a timestamp for the author using the command for the first time.
    timestamps.set(message.author.id, now);

    // Delete the timestamp after the length of the cooldownAmount.
    setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);

    // Execute the desired command.
    try {
        command.execute(message, args);
    } catch (err) {
        console.error(err);
        message.reply("There was an error trying to execute that command!")
    }
});

// Logs the bot in to be online
client.login(token);

