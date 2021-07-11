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
        const taggedRole = message.mentions.roles.first();
        const taggedMember = message.guild.member(taggedUser);

        // Validation
        if (!taggedUser) {
            return message.reply("Specify who you want to remove a role from by tagging them before tagging the role.");
        };
        if (!taggedRole) {
            return message.reply("Specify which role you want to remove from the tagged user.");
        };
        if (!taggedMember) {
            return message.reply("You cannot remove a role from someone who isn't in the guild.");
        };
        if (!taggedMember.roles.cache.has(taggedRole.id)) {
            return message.reply(`${taggedUser} does not have the role ${taggedRole.name}!`);
        };

        // Remove role from user.
        try {
            await taggedMember.roles.remove(taggedRole);
            message.channel.send(`${taggedRole.name} has been successfully removed from ${taggedUser}.`);
        } catch (err) {
            console.error(err);
            message.reply("There was an error with this command!");
        };
    },
};