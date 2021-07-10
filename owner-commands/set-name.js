module.exports = {
    name: "set-name",
    description: "Owner command to set the name of the bot.",
    cooldown: 5,
    args: true,
    usage: "<new-name>",
    async execute(message, args) {
        try {
            if (args.length === 1) {
                await message.client.user.setUsername(args[0]);
                message.reply(`My name has been changed to ${args[0]}. I hope it isn't dumb.`);
            } else {
                const newName = args.join(" ");
                await message.client.user.setUsername(newName);
                message.reply(`My name has been changed to ${newName}. I hope it isn't dumb.`);
            }
        } catch (err) {
            console.error(err);
            message.reply("You messed something up, Jordan.");
        }
    }
}