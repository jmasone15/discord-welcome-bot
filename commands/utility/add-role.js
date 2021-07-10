module.exports = {
    name: "add-role",
    description: "Give a role to a targeted user.",
    guildOnly: true,
    cooldown: 1,
    args: true,
    usage: "<user> <role>",
    permissions: "MANAGE_ROLES",
    async execute(message, args) {
        // Grab the username of the target user.
        const taggedUser = message.mentions.users.first();

        // Validation
        if (!taggedUser) {
            return message.reply("Specify who you want to give a role by tagging them.");
        }
        if (args.length < 2) {
            return message.reply("Specify which role you want to give the user.");
        }
        if (args.length > 2) {
            return message.reply("Only one role at a time.");
        }

        const role = message.guild.roles.cache.find(role => role.name === args[1]);
        const taggedMember = message.guild.member(taggedUser);

        if (taggedMember) {
            // taggedMember.roles.add(role).then(() => {
            //     message.channel.send(`${taggedUser} has successfully been given the role ${role.name}.`);
            // }).catch(err => {
            //     console.error(err);
            //     message.reply("There was an error with this command!");
            // });
            try {
                await taggedMember.roles.add(role);
                message.channel.send(`${taggedUser} has successfully been given the role ${role.name}.`);
            } catch (err) {
                console.error(err);
                message.reply("There was an error with this command!");
            }
        } else {
            message.reply("You cannot give a role to someone who isn't in the guild.")
        }
    }
}