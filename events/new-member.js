module.exports = {
    name: "guildMemberAdd",
    execute(member) {
        const channel = member.guild.channels.cache.find(ch => ch.name === "welcome-logs");
        if (!channel) {
            return console.log("Whoops");
        }
        channel.send(`Welcome to the server, ${member}`);
    },
};