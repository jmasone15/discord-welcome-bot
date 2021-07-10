const fs = require("fs");

module.exports = {
    name: "reload",
    description: "Reloads a command",
    args: true,
    execute(message, args) {
        // Grabs the command name or alias from the arguments.
        const commandName = args[0].toLowerCase();
        const command = message.client.commands.get(commandName) || message.client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

        // Validation for the argument.
        if (!command) {
            return message.channel.send(`There is no command with name or alias \`${commandName}\`, ${message.author}!`);
        }

        // Target the folder, subfolder, and file of the command you want to reload.
        const commandFolders = fs.readdirSync("./commands");
        const folderName = commandFolders.find(folder => fs.readdirSync(`./commands/${folder}`).includes(`${command.name}.js`));

        // Delete the existing command from the commands collection.
        delete require.cache[require.resolve(`../${folderName}/${command.name}.js`)];

        // Require the file again to reset the collection.
        try {
            const newCommand = require(`../${folderName}/${command.name}.js`);
            message.client.commands.set(newCommand.name, newCommand);
            message.channel.send(`Command \`${newCommand.name}\` was reloaded successfully!`);

        } catch (err) {
            console.error(err);
            message.channel.send(`There was an error while reloading the command \`${command.name}\`:\n\`${error.message}\``);
        };
    },
};