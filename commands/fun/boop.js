module.exports = {
    name: "boop",
    description: "Boop!",
    cooldown: 5,
    args: false,
    usage: " ",
    async execute(message, args) {
        try {
            await message.channel.send("Beep!");
        } catch (err) {
            console.error(err);
            message.reply("Error using this command.");
        }
    },
};