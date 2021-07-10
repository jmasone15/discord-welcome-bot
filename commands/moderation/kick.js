module.exports = {
    name: "kick",
    description: "Kicks a targeted user from the guild.",
    guildOnly: true,
    cooldown: 5,
    permissions: "KICK_MEMBERS",
    execute(message, args) {
        // Grab the username of the targeted user.
        const taggedUser = message.mentions.users.first();
        console.log(taggedUser);

        // If the targeted user exists, kick them from the server.
        if (!taggedUser) {
            return message.reply("Specify who you want to kick by tagging them.");
        } else {
            // Grab the id of the targeted user within in guild.
            const taggedMember = message.guild.member(taggedUser);
            console.log(taggedMember);

            if (taggedMember) {
                taggedMember.kick().then(() => {
                    message.channel.send(`${taggedUser.username} has been kicked. See ya later stinky.`);
                }).catch(err => {
                    console.error(err);
                    message.reply("There was an error kicking that user!");
                });
            } else {
                message.reply("That user isn't in this guild!");
            };
        };
    },
};