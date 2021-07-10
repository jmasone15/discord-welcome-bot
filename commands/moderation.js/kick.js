module.exports = {
    name: "kick",
    description: "Kicks a targeted user from the guild.",
    guildOnly: true,
    cooldown: 5,
    permissions: "KICK_MEMBERS",
    execute(message, args) {

        // Grab the username and the user id of the targeted user.
        const taggedUser = message.mentions.users.first();
        const taggedMember = message.mentions.members.first();

        // If the targeted user exists, kick them from the server.
        if (!taggedUser) {
            return message.reply("Specify who you want to kick by tagging them.")
        } else {
            taggedMember.kick();
            message.channel.send(`${taggedUser.username} has been kicked. See ya later stinky.`);
        }
    },
};