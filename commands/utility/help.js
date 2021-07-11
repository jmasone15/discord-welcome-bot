const { prefix } = require("../../config.json");

module.exports = {
    name: "help",
    description: "List of all commands or info about a specific command.",
    aliases: ["commands"],
    usage: "[command name]",
    cooldown: 5,
    async execute(message, args) {
        const data = [];
        const { commands } = message.client;

        // If no particular command was specified, DM the author a list of all the commands.
        if (!args.length) {
            data.push("Here's a list of all my commands:\n");
            data.push(commands.map(command => `\`${command.name}\``).join("\n"));
            data.push(`\nYou can send \`${prefix}help [command name]\` to get info on a specific command!`);

            try {
                await message.author.send(data, { split: true });

                if (message.channel.type === "dm") return;
                message.reply("I've sent you a DM with all my commands!");
            } catch (err) {
                console.error(err);
                message.reply("It seems like I can't DM you! Do you have DMs disabled?");
            }
        }

        // If there is a specific command in the args, find the command in the collection or aliases.
        const commandName = args[0].toLowerCase();
        const command = commands.get(commandName) || commands.find(c => c.aliases && c.aliases.includes(commandName));

        // Validation check to see if command exists.
        if (!command) {
            return message.reply("That's not a valid command!");
        }

        // Adds the command name to the data array.
        data.push(`**Name:** ${command.name}`);

        // Adds various info about the command to the data array.
        if (command.aliases) {
            data.push(`**Aliases:** ${command.aliases.join(", ")}`);
        }
        if (command.description) {
            data.push(`**Description:** ${command.description}`);
        }
        if (command.usage) {
            data.push(`**Usage:** ${prefix}${command.name} ${command.usage}`);
        }

        // Adds cooldown info to the data array.
        data.push(`**Cooldown:** ${command.cooldown || 3} second(s)`);

        // Sends the data array to the channel.
        await message.channel.send(data, { split: true });
    },
};