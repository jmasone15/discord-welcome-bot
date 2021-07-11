module.exports = {
    name: "ping",
    description: "Ping!",
    cooldown: 5,
    async execute(message, args) {
        try {
            await message.channel.send("Pong!");
        } catch (err) {
            console.error(err);
            message.reply("Error using this command.");
        }
    },
};