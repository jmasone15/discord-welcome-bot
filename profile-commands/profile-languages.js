const Profile = require("../models/profileModel");

module.exports = {
    name: "profile.languages",
    description: "Command that allows users to change their profile languages.",
    guildOnly: true,
    cooldown: 1,
    args: true,
    usage: "<language>",
    async execute(message, args) {
        try {
            const existingProfile = await Profile.findOne({ username: message.author.username });

            if (!existingProfile) {
                return message.reply("To use this command, you must first set up your profile using the <!profile> command.")
            };

            if (existingProfile.languages[0] === "Use the command '<!profile.languages> <language>' to change your languages, please add one at a time.") {
                const newLanguageArray = [];
                newLanguageArray.push(args[0]);

                await Profile.findByIdAndUpdate(existingProfile.id, { languages: newLanguageArray });
                message.reply("Your languages have been updated successfully!");
            } else {

                const languageArray = existingProfile.languages;
                languageArray.push(args[0]);

                await Profile.findByIdAndUpdate(existingProfile.id, { languages: languageArray });
                message.reply("Your languages have been updated successfully!");
            }

        } catch (err) {
            console.error(err);
            message.reply("There was an error with updating your profile languages.");
        };
    },
};