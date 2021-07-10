require("dotenv").config();

const Discord = require("discord.js");
const bot = new Discord.Client();
const PREFIX = "$";


let pingCount = 0;

// Events
bot.on("ready", () => {
    console.log(`${bot.user.username} is running.`);
});
bot.on("message", (msg) => {
    if (msg.content.startsWith(PREFIX)) {
        const [command, ...args] = msg.content
            .trim()
            .substring(PREFIX.length)
            .split(/\s+/);
        if (command === "kick") {
            if (msg.member.hasPermission("KICK_MEMBERS"))
                return msg.reply("You do not have permissions to use this command.")
            if (args.length === 0) return msg.reply("Please provide a user you want to kick.")
            const member = msg.guild.members.cache.get(args[0]);
            if (member) {
                member.kick().then((member) => {
                    msg.channel.send(`${member} was kicked. Later stinky :/`)
                }).catch((err) => msg.channel.send("I cannot kick that user, they make more money than me :("));
            } else {
                msg.channel.send("User not found.");
            }
        }
    }
});
// bot.on("message", (msg) => {
//     if (msg.content === "$intro") {
//         msg.channel.send(`Hello! I am the ${bot.user.username} and I am here to help!`)
//     }
// });
// bot.on("message", (msg) => {
//     if (msg.content === "$me") {
//         msg.reply(`Your name is ${msg.author.tag}`);
//     }
// });
bot.on("message", (msg) => {
    if (msg.content === "ping" && pingCount < 10) {
        msg.channel.send("pong");
        pingCount++
    } else if (msg.content === "ping" && pingCount >= 10) {
        msg.reply("Please stop, I have kids to get home to.");
        pingCount = 0;
    }
});

// Logs the bot in to be online
bot.login(process.env.DISCORDJS_BOT_TOKEN);