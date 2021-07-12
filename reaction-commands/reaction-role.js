module.exports = {
    name: "reaction-role",
    description: "Sets up a reaction role message!",
    guildOnly: true,
    cooldown: 1,
    args: false,
    usage: " ",
    aliases: ["reactionrole", "role-reaction"],
    permissions: "MANAGE_ROLES",
    async execute(message, args, Discord, client) {
        const channel = message.channel.id;
        const javaScriptRole = message.guild.roles.cache.find(role => role.name === "JavaScript");
        const javaRole = message.guild.roles.cache.find(role => role.name === "Java");
        const pythonRole = message.guild.roles.cache.find(role => role.name === "Python");
        const cSharpRole = message.guild.roles.cache.find(role => role.name === "C#");
        const nodeRole = message.guild.roles.cache.find(role => role.name === "Node.js");

        const javaScriptEmoji = "🍎";
        const javaEmoji = "🍊";
        const pythonEmoji = "🍋";
        const cSharpEmoji = "🍐";
        const nodeEmoji = "🍇";

        const embed = new Discord.MessageEmbed()
            .setColor("#e42623")
            .setTitle("Choose a language that you know!")
            .setDescription("Choosing a language will give you the role of that language!\n\n"
                + `${javaScriptEmoji} for the @JavaScript Role.\n\n`
                + `${javaEmoji} for the @Java Role.\n\n`
                + `${pythonEmoji} for the @Python Role.\n\n`
                + `${cSharpEmoji} for the @C# Role.\n\n`
                + `${nodeEmoji} for the @Node.js Role.`
            );

        const messageEmbed = await message.channel.send(embed);
        messageEmbed.react(javaScriptEmoji);
        messageEmbed.react(javaEmoji);
        messageEmbed.react(pythonEmoji);
        messageEmbed.react(cSharpEmoji);
        messageEmbed.react(nodeEmoji);

        client.on("messageReactionAdd", async (reaction, user) => {
            // Validation
            if (reaction.message.partial) await reaction.message.fetch();
            if (reaction.partial) await reaction.fetch();
            if (user.bot) return;
            if (!reaction.message.guild) return;

            if (reaction.message.channel.id === channel) {
                if (reaction.emoji.name === javaScriptEmoji) {
                    await reaction.message.guild.members.cache.get(user.id).roles.add(javaScriptRole);
                    console.log("User has been gived JavaScript Role");
                } else if (reaction.emoji.name === javaEmoji) {
                    await reaction.message.guild.members.cache.get(user.id).roles.add(javaRole);
                    console.log("User has been gived Java Role");
                } else if (reaction.emoji.name === pythonEmoji) {
                    await reaction.message.guild.members.cache.get(user.id).roles.add(pythonRole);
                    console.log("User has been gived Python Role");
                } else if (reaction.emoji.name === cSharpEmoji) {
                    await reaction.message.guild.members.cache.get(user.id).roles.add(cSharpRole);
                    console.log("User has been gived C# Role");
                } else if (reaction.emoji.name === nodeEmoji) {
                    await reaction.message.guild.members.cache.get(user.id).roles.add(nodeRole);
                    console.log("User has been gived Node.js Role");
                } else {
                    return message.channel.send("Whoops, something went wrong.");
                }
            } else {
                return message.channel.send("Whoops, something went wrong.");
            }
        });

        client.on("messageReactionRemove", async (reaction, user) => {
            // Validation
            if (reaction.message.partial) await reaction.message.fetch();
            if (reaction.partial) await reaction.fetch();
            if (user.bot) return;
            if (!reaction.message.guild) return;

            if (reaction.message.channel.id === channel) {
                if (reaction.emoji.name === javaScriptEmoji) {
                    await reaction.message.guild.members.cache.get(user.id).roles.remove(javaScriptRole);
                    console.log("User has removed JavaScript Role");
                } else if (reaction.emoji.name === javaEmoji) {
                    await reaction.message.guild.members.cache.get(user.id).roles.remove(javaRole);
                    console.log("User has removed Java Role");
                } else if (reaction.emoji.name === pythonEmoji) {
                    await reaction.message.guild.members.cache.get(user.id).roles.remove(pythonRole);
                    console.log("User has removed Python Role");
                } else if (reaction.emoji.name === cSharpEmoji) {
                    await reaction.message.guild.members.cache.get(user.id).roles.remove(cSharpRole);
                    console.log("User has removed C# Role");
                } else if (reaction.emoji.name === nodeEmoji) {
                    await reaction.message.guild.members.cache.get(user.id).roles.remove(nodeRole);
                    console.log("User has removed Node.js Role");
                } else {
                    return message.channel.send("Whoops, something went wrong.");
                }
            } else {
                return message.channel.send("Whoops, something went wrong.");
            }
        });
    },
};