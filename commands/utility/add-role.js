module.exports = {
    name: "add-role",
    description: "Give a role to a targeted user.",
    guildOnly: true,
    cooldown: 1,
    args: true,
    usage: "<@user> <@role>",
    permissions: "MANAGE_ROLES",
    async execute(message, args) {
        // Grab the username of the target user.
        const taggedUser = message.mentions.users.first();
        const taggedRole = message.mentions.roles.first();
        const taggedMember = message.guild.member(taggedUser);

        // Validation
        if (!taggedUser) {
            return message.reply("Specify who you want to give a role by tagging them before tagging the role.");
        };
        if (!taggedRole) {
            return message.reply("Specify which role you want to give the tagged user.");
        };
        if (!taggedMember) {
            return message.reply("You cannot give a role to someone who isn't in the guild.");
        };
        if (taggedMember.roles.cache.has(taggedRole.id)) {
            return message.reply(`${taggedUser} already has the role ${taggedRole.name}!`);
        };

        // Add role to user.
        try {
            await taggedMember.roles.add(taggedRole);
            message.channel.send(`${taggedUser} has successfully been given the role ${taggedRole.name}.`);
        } catch (err) {
            console.error(err);
            message.reply("There was an error with this command!");
        };

    },
};