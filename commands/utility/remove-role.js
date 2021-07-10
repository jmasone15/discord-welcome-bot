module.exports = {
    name: "remove-role",
    description: "Remove a role or all roles from a targeted user.",
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
            return message.reply("Specify who you want to remove a role from by tagging them.");
        }
        if (args.length > 2) {
            return message.reply("Only one role at a time.");
        }
        if (args.length === 1) {
            return message.reply(`Please enter the role you want to remove from ${taggedUser} after the user's name.`)
        }

        const role = message.guild.roles.cache.find(role => role.name === args[1]);
        const taggedMember = message.guild.member(taggedUser);

        if (taggedMember) {
            if (taggedMember.roles.cache.some(r => r.name === role.name)) {
                try {
                    await taggedMember.roles.remove(role);
                    message.channel.send(`${role.name} has been successfully removed from ${taggedUser}.`);
                } catch (err) {
                    console.error(err);
                    message.reply("There was an error with this command!");
                }
            } else {
                return message.reply(`${taggedUser} does not have the role ${role.name}!`);
            }
        } else {
            message.reply("You cannot remove a role from someone who isn't in the guild.")
        }
    }
}