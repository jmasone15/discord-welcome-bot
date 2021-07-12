const Discord = require("discord.js");
const Profile = require("../models/profileModel");

module.exports = {
    name: "profile",
    description: "Setup a developer profile for your personal account.",
    guildOnly: false,
    cooldown: 1,
    // args: true,
    // usage: " ",
    // aliases: ["developer", "profile-setup"],
    async execute(message, args) {
        try {
            const existingProfile = await Profile.findOne({ username: message.author.username });
            if (existingProfile) {
                console.log("Profile already exists");
                console.log(existingProfile.languages.join(", "));
            } else {
                const newProfile = new Profile({
                    username: message.author.username,
                    thumbnail: message.author.displayAvatarURL({ format: 'png', dynamic: true })
                });
                const savedProfile = await newProfile.save();

                const profileMessageEmbed = new Discord.MessageEmbed()
                    .setColor("#7700ff")
                    .setTitle(savedProfile.username)
                    .setDescription(savedProfile.bio)
                    .setThumbnail(savedProfile.thumbnail)
                    .addFields([{ name: "Github", value: savedProfile.github }, { name: "Portfolio", value: savedProfile.portfolio }, { name: "LinkedIn", value: savedProfile.linkedIn }, { name: "Languages", value: savedProfile.languages.join(", ") }])
                    .setTimestamp()

                try {
                    await message.reply(profileMessageEmbed);
                    message.reply("You can now setup your profile with the various commands.")
                } catch (err) {
                    console.error(err);
                    message.reply("There was an error with the embed message");
                }
            }
        } catch (err) {
            console.error(err);
        }
    }
}