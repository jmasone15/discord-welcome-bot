module.exports = {
    name: "kick",
    description: "Kicks a targeted user from the guild.",
    guildOnly: true,
    execute(message, args) {
        const taggedUser = message.mentions.users.first();
        if (!taggedUser) {
            return message.reply("Specify who you want to kick by tagging them.")
        } else {
            message.channel.send(`You wanted to kick: ${taggedUser.username}`);
        }
    },
};