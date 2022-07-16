const { Client } = require("discord.js")

const config = require("../../config.json")

const JustAsk = require("../commands/JustAsk.ts")
const DropdownRoles = require("../commands/DropdownRoles.ts")
const ReactionRoles = require("../listeners/ReactionRoles.ts")

const prefix = "!"

const client = new Client({ restTimeOffset: 0, intents: ['GUILDS', 'GUILD_MESSAGES', 'GUILD_MESSAGE_REACTIONS','GUILD_MEMBERS'], partials: ['MESSAGE', 'CHANNEL', 'REACTION'] });

client.on("error", (err) => {
    console.error(err)
});

client.on("ready", async () => {
    console.log(`√ ${client.user.username} #${client.user.discriminator} is online!`)
});

client.on("messageCreate", (message) => {
    if (!message.content.startsWith(prefix)) {
        JustAsk.execute(message)
    }
    
    if (message.content.startsWith(prefix)) {
        const args = message.content.slice(prefix.length).split(/ +/);
        const command = args.shift().toLowerCase();

        if (command == "dropdown") {
            DropdownRoles.execute(message, client)
        }
    }
})

client.on('interactionCreate', (interaction) => {
    ReactionRoles.execute(interaction)
})

client.login(config.token)