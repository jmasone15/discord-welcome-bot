module.exports = {
    name: "pong",
    description: "Pong!",
    cooldown: 5,
    execute(message, args) {
        message.channel.send("Ping!");
    },
};