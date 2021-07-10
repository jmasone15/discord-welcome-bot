module.exports = {
    name: "prune",
    description: "Deletes the last 2 - 100 messages in the channel the message was sent in based on author input.",
    cooldown: 5,
    permissions: "MANAGE_CHANNELS",
    execute(message, args) {
        // Changes string into integer
        const amount = parseInt(args[0]) + 1;

        if (isNaN(amount) || !amount) {
            return message.reply("Please enter a valid number after the prune command.");
        } else if (amount < 2 || amount > 100) {
            return message.reply("Please enter a number between 2 and 100.");
        } else {
            return message.channel.bulkDelete(amount, true).then(() => {
                message.channel.send(`Successfully deleted ${amount - 1} messages from ${message.channel.name}.`)
            }).catch(err => {
                console.error(err);
                message.channel.send("There was an error trying to prune messages in this channel!");
            });
        }
    },
};