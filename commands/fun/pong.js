module.exports = {
    name: "pong",
    description: "Pong!",
    cooldown: 5,
    args: false,
    usage: " ",
    async execute(message, args) {
        try {
            await message.channel.send("Ping!");
        } catch (err) {
            console.error(err);
            message.reply("Error using this command.");
        }
    },
};