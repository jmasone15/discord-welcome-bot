module.exports = {
    name: "ready",
    once: true,
    execute(client) {
        client.user.setPresence({ activity: { name: "your commands!", type: "LISTENING" }, status: "online" })
        console.log(`Ready! My name is ${client.user.username} and I am here to help :)`);
    },
};