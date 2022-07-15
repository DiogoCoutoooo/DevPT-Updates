const Eris = require("eris")

let i = 0
let n = 0

const compare = ["alguém", "alguem", "algum", "preciso", "precisava", "ajuda", "ajudar", "problema", "consegue", "malta", "gente", "programa", "algo", "codificação", "codificacão", "codificaçao", "codificacao"]
const mandatory = ["copilot", "android", "ios", "linux", "ubuntu", "manjaro", "mint", "windows", "java", "javascript", "js", "typescript", "ts", "kotlin", "html", "css", "c", "c#", "c++", "py", "python", "rust", "ruby", "pearl", "assembly", "shell", "bash", "haskell", "swift", "scala", "golang", "clojure", "net", "f#", "php", "game", "gamedev", "dev", "ops", "devops", "seguranca", "security", "backend", "back", "end", "iot", "system", "react", "vue", "angular", "node", "npm", "tkinter", "código", "codigo", "system", "códigos", "puppeteer"]

let filteredcompare = []
let filteredmandatory = []

let comparestate = ""
let mandatorystate = ""

const bot = new Eris(
    "",
    {
        restTimeOffset: 0,

        intents: [
            "guilds",
            "guildMessages"
        ],

        partials: [
            "message"
        ]
    },
    {
        owner: 'Not_Hagrid'
    }
);

bot.on("error", (err) => {
    console.error(err)
});

bot.on("ready", async () => {
    console.log(`√ ${bot.user.username} #${bot.user.discriminator} is online!`)
});

bot.on("messageCreate", (msg) => {
    if (msg.author.bot) return

    //Dá o número de pontos finais e vírgulas numa mensagem ---ainda não implementado, a usar mais tarde---
    const totalponctuation = msg.content.split(/[.,(){}]/).length - 1

    //Divide a frase para apenas ficarem palavras sem pontuação
    const keywords = msg.content.replace(/[.,!_]/, " ").replace(/(\r\n|\n|\r)/g, " ").replace("?", " ?").toLowerCase().split(" ")

    console.log(keywords)

    //Palvras a comparar, para saber se se trata realmente de uma pergunta
    while (comparestate != undefined) {
        let pushcompareword = keywords.includes(compare[i])

        if (pushcompareword == true) {
            filteredcompare.push(compare[i])
        }

        if (compare[i] == undefined) {
            comparestate = undefined
        }

        i = i + 1
    }

    //Palvras obrigatórias, para diferenciar perguntas de programação de perguntas casuais
    while (mandatorystate != undefined) {
        let pushmandatoryword = keywords.includes(mandatory[n])

        if (pushmandatoryword == true) {
            filteredmandatory.push(mandatory[n])
        }

        if (mandatory[n] == undefined) {
            mandatorystate = undefined
        }

        n = n + 1
    }

    //O embed
    const jaembed = {
        color: 0x25282b,
        title: 'Não perguntes para perguntar',
        url: 'https://dontasktoask.com/pt-pt/',
        thumbnail: {
            url: 'https://dontasktoask.com/favicon.png'
        }
    }

    //Primeiro critério que defini para considerar uma pergunta "mal-feita"
    if (keywords.length < 16 && filteredcompare.length > 0 && filteredmandatory.length > 0) {       
        bot.createMessage(msg.channel.id ,{ content: ['👉 https://dontasktoask.com/pt-pt/'], embeds: [jaembed] })
    }

    else if (keywords.length < 12 && filteredcompare.length > 0 && keywords.includes("?")) {
        bot.createMessage(msg.channel.id ,{ content: ['👉 https://dontasktoask.com/pt-pt/'], embeds: [jaembed] })
    }

    i = 0
    n = 0

    filteredcompare = []
    filteredmandatory = []

    comparestate = ""
    mandatorystate = ""
})

bot.connect()
