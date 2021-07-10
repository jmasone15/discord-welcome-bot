module.exports = {
    name: "ready",
    once: true,
    execute(client) {
        console.log(`Ready! My name is ${client.user.username} and I am here to help :)`);
    },
};