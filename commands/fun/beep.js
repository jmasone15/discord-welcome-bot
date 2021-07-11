module.exports = {
    name: "beep",
    description: "Beep!",
    cooldown: 5,
    async execute(message, args) {
        try {
            await message.channel.send("Boop!");
        } catch (err) {
            console.error(err);
            message.reply("Error using this command.");
        }
    },
};