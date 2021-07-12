const Profile = require("../models/profileModel");

module.exports = {
    name: "profile.github",
    description: "Command that allows users to change their profile bio.",
    guildOnly: true,
    cooldown: 1,
    args: true,
    usage: "<url>",
    async execute(message, args) {
        try {
            const existingProfile = await Profile.findOne({ username: message.author.username });
            if (!existingProfile) {
                return message.reply("To use this command, you must first set up your profile using the <!profile> command.")
            };

            await Profile.findByIdAndUpdate(existingProfile.id, { github: args[0] });
            message.reply("Your github has been updated successfully!");

        } catch (err) {
            console.error(err);
            message.reply("There was an error with updating your profile github.");
        };
    },
};;