const Discord = require("discord.js");
const Profile = require("../models/profileModel");

module.exports = {
    name: "profile",
    description: "Setup a developer profile for your personal account or view another person's account",
    guildOnly: true,
    cooldown: 1,
    usage: "<@username>(optional)",
    aliases: ["developer", "profile-setup"],
    async execute(message, args) {
        if (!args.length) {
            try {
                const existingProfile = await Profile.findOne({ username: message.author.username });
                if (existingProfile) {
                    const existingProfileMessageEmbed = new Discord.MessageEmbed()
                        .setColor("#7700ff")
                        .setTitle(existingProfile.username)
                        .setDescription(existingProfile.bio)
                        .setThumbnail(existingProfile.thumbnail)
                        .addFields([{ name: "Github", value: existingProfile.github }, { name: "Portfolio", value: existingProfile.portfolio }, { name: "LinkedIn", value: existingProfile.linkedIn }, { name: "Languages", value: existingProfile.languages.join(", ") }])
                        .setTimestamp()

                    try {
                        await message.reply(existingProfileMessageEmbed);
                    } catch (err) {
                        console.error(err);
                        message.reply("There was an error with the embed message");
                    }
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
        } else {
            const taggedUser = message.mentions.users.first();
            const taggedMember = message.guild.member(taggedUser);

            if (!taggedMember) {
                return message.reply("That user is not a member of this guild.");
            };

            try {
                const findProfile = await Profile.findOne({ username: taggedUser.username });

                const findProfileMessageEmbed = new Discord.MessageEmbed()
                    .setColor("#7700ff")
                    .setTitle(findProfile.username)
                    .setDescription(findProfile.bio)
                    .setThumbnail(findProfile.thumbnail)
                    .addFields([{ name: "Github", value: findProfile.github }, { name: "Portfolio", value: findProfile.portfolio }, { name: "LinkedIn", value: findProfile.linkedIn }, { name: "Languages", value: findProfile.languages.join(", ") }])
                    .setTimestamp()

                try {
                    await message.reply(findProfileMessageEmbed);
                } catch (err) {
                    console.error(err);
                    message.channel.send("There was an error with the find embed message");
                }
            } catch (err) {
                console.error(err);
                message.channel.send("This user has not set up their profile yet.")
            }
        };
    },
};