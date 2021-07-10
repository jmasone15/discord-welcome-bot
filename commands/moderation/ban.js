module.exports = {
    name: "ban",
    description: "Bans a targeted user from the guild.",
    guildOnly: true,
    cooldown: 5,
    args: true,
    usage: "<user>",
    permissions: "BAN_MEMBERS",
    execute(message, args) {
        // Grab the username of the targeted user.
        const taggedUser = message.mentions.users.first();

        // If the targeted user exists, ban them from the server.
        if (!taggedUser) {
            return message.reply("Specify who you want to ban by tagging them.");
        } else {
            // Grab the id of the targeted user within in guild.
            const taggedMember = message.guild.member(taggedUser);

            if (taggedMember) {
                taggedMember.ban({ reason: "They were not being a good noodle." }).then(() => {
                    message.channel.send(`${taggedUser.username} has been banned. See ya never stinky.`);
                }).catch(err => {
                    console.error(err);
                    message.reply("There was an error banning that user!");
                });
            } else {
                message.reply("That user isn't in this guild!");
            };
        };
    },
};