module.exports = {
    name: "role",
    description: "Give a role to a targeted user.",
    cooldown: 5,
    args: true,
    usage: "<user> <role>",
    execute(message, args) {
        if (args.length === 2) {
            console.log(`User ${args[0]} has been given the role ${args[1]}`);
        } else {
            message.reply(`The proper usage is: \n\`!role <user> <role>\``);
        }
    }
}