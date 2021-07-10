module.exports = {
    name: "owner-ping",
    description: "Ping!",
    cooldown: 5,
    execute(message, args) {
        message.channel.send("Owner Pong!");
    },
};