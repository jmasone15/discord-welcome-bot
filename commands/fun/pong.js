module.exports = {
    name: "pong",
    description: "Pong!",
    cooldown: 5,
    async execute(message, args) {
        try {
            await message.channel.send("Ping!");
        } catch (err) {
            console.error(err);
            message.reply("Error using this command.");
        }
    },
};