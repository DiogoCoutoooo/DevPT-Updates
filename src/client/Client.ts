const Eris = require("eris")

const config = require("../../config.json")

const JustAsk = require("../commands/JustAsk.ts")
const DropdownRoles = require("../commands/DropdownRoles.ts")
const ReactionRoles = require("../listeners/ReactionRoles.ts")

const prefix = "!"

const client = new Eris(
    config.token,
    {
        restTimeOffset: 0,

        intents: [
            "guilds",
            "guildMembers",
            "guildMessages",
            'guildMessagesReaction'
        ],

        partials: [
            "message",
            "channel",
            "reaction"
        ]
    },
    {
        owner: 'Not_Hagrid'
    }
)

client.on("error", (err) => {
    console.error(err)
})

client.on("ready", async () => {
    console.log(`√ ${client.user.username} #${client.user.discriminator} is online!`)
})

client.on("messageCreate", (message) => {
    if (!message.content.startsWith(prefix)) {
        JustAsk.execute(message, client)
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

client.connect()