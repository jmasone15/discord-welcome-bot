module.exports = {
    name: "set-activity",
    description: "Owner command to set the activity of the bot.",
    cooldown: 5,
    args: true,
    usage: "new-activity",
    async execute(message, args) {
        try {
            const newActivity = args.join(" ");
            await message.client.user.setActivity(newActivity);
            message.reply(`Successfully set my activity to \n'${newActivity}'\nI wonder what I am doing...`)
        } catch (err) {
            console.error(err);
            message.reply("You messed something up, Jordan.");
        };
    },
}