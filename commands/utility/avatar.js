module.exports = {
    name: "avatar",
    description: "Collects avatar from the message author or the tagged users in the arguments.",
    execute(message, args) {
        if (!message.mentions.users.size) {
            return message.reply(`Your Avatar: <${user.displayAvatarURL({ format: 'png', dynamic: true })}>`)
        }

        const avatarList = message.mentions.users.map(user => {
            return `${user.username}'s Avatar: <${user.displayAvatarURL({ format: 'png', dynamic: true })}>`
        });

        message.channel.send(avatarList);
    },
};