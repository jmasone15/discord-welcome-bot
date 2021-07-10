client.on("message", message => {
    // Validation of prefix and non bot message.
    if (!message.content.startsWith(prefix) || message.author.bot) return;

    // Gets the arguments that come after the command message.
    const args = message.content.slice(prefix.length).trim().split(/ +/);
    const command = args.shift().toLowerCase();

    // Ping Pong
    if (command === "ping") {
        message.channel.send("Pong.");
    } else if (command === "pong") {
        message.channel.send("Ping.");
    }




    // Get User Tagged in Message
    else if (command === "kick") {
        const taggedUser = message.mentions.users.first();
        if (!taggedUser) {
            return message.reply("Specify who you want to kick by tagging them.")
        } else {
            message.channel.send(`You wanted to kick: ${taggedUser.username}`);
        }
    }


    // See Tagged User Avatars
    else if (command === "avatar") {
        if (!message.mentions.users.size) {
            return message.reply(`Your Avatar: <${user.displayAvatarURL({ format: 'png', dynamic: true })}>`)
        }

        const avatarList = message.mentions.users.map(user => {
            return `${user.username}'s Avatar: <${user.displayAvatarURL({ format: 'png', dynamic: true })}>`
        });

        message.channel.send(avatarList);
    }


    // Prune command deletes X number of messages in the channel.
    else if (command === "prune") {
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
    }
});