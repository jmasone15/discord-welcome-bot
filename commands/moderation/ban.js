module.exports = {
    name: "ban",
    description: "Bans a targeted user from the guild.",
    guildOnly: true,
    cooldown: 5,
    permissions: "BAN_MEMBERS",
    execute(message, args) {
        const taggedUser = message.mentions.users.first();
        if (!taggedUser) {
            return message.reply("Specify who you want to ban by tagging them.")
        } else {
            message.channel.send(`You wanted to ban: ${taggedUser.username}`);
        }
    },
};