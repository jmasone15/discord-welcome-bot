const Discord = require("discord.js");
const { prefix } = require("../../config.json");

module.exports = {
    name: "help",
    description: "List of all commands or info about a specific command.",
    args: false,
    aliases: ["commands"],
    usage: " or !help <command name>",
    cooldown: 3,
    async execute(message, args) {
        const data = [];
        const { commands } = message.client;
        const commandObjectArray = [];

        commands.map(command => commandObjectArray.push({ name: `\`${command.name}\``, value: command.description }));

        // If no particular command was specified, DM the author a list of all the commands.
        if (!args.length) {
            const allCommandsEmbed = new Discord.MessageEmbed()
                .setColor("#7700ff")
                .setTitle("Command List:")
                .setDescription(`You can use \`${prefix}help [command name]\` to get more info on a specific command.`)
                .setThumbnail("https://cdn.discordapp.com/avatars/420651836157067275/a_01603ec5cd3a13e039c34c2785d630b4.gif")
                .addFields(commandObjectArray)
                .setTimestamp();

            try {
                await message.author.send(allCommandsEmbed);
                console.log(allCommandsEmbed);
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

        // Adds various info about the command to the data array.
        if (command.aliases && command.usage) {

            const commandEmbed = new Discord.MessageEmbed()
                .setColor("#7700ff")
                .setTitle(command.name)
                .setDescription(command.description)
                .addField("Aliases", command.aliases.join(" "))
                .addField("Usage", `${prefix}${command.name} ${command.usage}`)
                .addField("Cooldown", `${command.cooldown || 3} second(s)`)

            await message.channel.send(commandEmbed);

        } else if (command.usage && !command.aliases) {
            const commandEmbed = new Discord.MessageEmbed()
                .setColor("#7700ff")
                .setTitle(command.name)
                .setDescription(command.description)
                .addField("Usage", `${prefix}${command.name} ${command.usage}`)
                .addField("Cooldown", `${command.cooldown || 3} second(s)`)

            await message.channel.send(commandEmbed);
        } else if (!command.usage && command.aliases) {
            const commandEmbed = new Discord.MessageEmbed()
                .setColor("#7700ff")
                .setTitle(command.name)
                .setDescription(command.description)
                .addField("Aliases", command.aliases.join(" "))
                .addField("Cooldown", `${command.cooldown || 3} second(s)`)

            await message.channel.send(commandEmbed);
        } else {
            const commandEmbed = new Discord.MessageEmbed()
                .setColor("#7700ff")
                .setTitle(command.name)
                .setDescription(command.description)
                .addField("Cooldown", `${command.cooldown || 3} second(s)`)

            await message.channel.send(commandEmbed);
        }

    },
};