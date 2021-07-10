module.exports = {
    name: "set-avatar",
    description: "Owner command to set the avatar of the bot.",
    cooldown: 5,
    args: true,
    usage: "<new-avatar-url>",
    async execute(message, args) {
        try {
            await message.client.user.setAvatar(args[0]);
            message.reply("My avatar has been changed, it better look cute.");
        } catch (err) {
            console.error(err);
            message.reply("You messed something up, Jordan.");
        };
    },
}