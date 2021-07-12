const Profile = require("../models/profileModel");

module.exports = {
    name: "profile.portfolio",
    description: "Command that allows users to change their profile portfolio.",
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
            if (args.length > 1) {
                return message.reply("The proper usage for this command is <!profile.portfolio> <url>.")
            };

            await Profile.findByIdAndUpdate(existingProfile.id, { portfolio: args[0] });
            message.reply("Your portfolio has been updated successfully!");

        } catch (err) {
            console.error(err);
            message.reply("There was an error with updating your profile portfolio.");
        };
    },
};