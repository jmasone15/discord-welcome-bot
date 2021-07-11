const Discord = require("discord.js");

module.exports = {
    name: "about",
    description: "Command to learn about bot creator.",
    cooldown: 5,
    args: false,
    usage: " ",
    async execute(message, args) {
        const aboutEmbed = new Discord.MessageEmbed()
            .setColor("#7700ff")
            .setTitle("Hi, I'm Jordan!")
            .setURL("https://github.com/jmasone15")
            .setDescription("I created this bot!")
            .setThumbnail("https://cdn.discordapp.com/avatars/420651836157067275/a_01603ec5cd3a13e039c34c2785d630b4.gif")
            .addField("About Me", "I am a Full Stack Developer based out of Orlando.")
            .setTimestamp()

        try {
            await message.channel.send(aboutEmbed);
        } catch (err) {
            console.error(err);
            message.reply("Error using this command.");
        }
    }
}