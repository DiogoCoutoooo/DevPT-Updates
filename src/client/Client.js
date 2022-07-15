const Eris = require("eris")

const bot = new Eris(
    "OTk3MjY2NTY3MjY2MDQ2MDI1.GkUjAN.GPdjLgalxoldxnZ32eaZKZ1J-CGIiBO2Ys67JU",
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

    //Variáveis para ver individualmente todos os elementos, o {i} para o compare[] e o {n} para o mandatory[]. Depois se estes elementos estiverem na frase original (keywords), são adicionadas ao filteredCompare/filteredMandatory
    let i = 0
    let n = 0

    const compare = ["alguém", "alguem", "algum", "preciso", "precisava", "ajuda", "ajudar", "problema", "consegue", "malta", "gente", "programa", "algo", "codificação", "codificacão", "codificaçao", "codificacao"]
    const mandatory = ["copilot", "android", "ios", "linux", "ubuntu", "manjaro", "mint", "windows", "java", "javascript", "js", "typescript", "ts", "kotlin", "html", "css", "c", "c#", "c++", "py", "python", "rust", "ruby", "pearl", "assembly", "shell", "bash", "haskell", "swift", "scala", "golang", "clojure", "net", "f#", "php", "game", "gamedev", "dev", "ops", "devops", "seguranca", "security", "backend", "back", "end", "iot", "system", "react", "vue", "angular", "node", "npm", "tkinter", "código", "codigo", "system", "códigos", "puppeteer"]

    let filteredCompare = []
    let filteredMandatory = []

    let compareState = ""
    let mandatoryState = ""

    //Dá o número de pontos finais e vírgulas numa mensagem ---ainda não implementado, a usar mais tarde---
    const totalPonctuation = msg.content.split(/[.,(){}]/).length - 1

    //Divide a frase para apenas ficarem palavras sem pontuação
    const keywords = msg.content.replace(/[.,!_]/, " ").replace(/(\r\n|\n|\r)/g, " ").replace("?", " ?").toLowerCase().split(" ")

    console.log(keywords)

    //Palvras a comparar, para saber se se trata realmente de uma pergunta
    while (compareState != undefined) {
        let pushCompareWord = keywords.includes(compare[i])

        if (pushCompareWord == true) {
            filteredCompare.push(compare[i])
        }

        if (compare[i] == undefined) {
            compareState = undefined
        }

        i = i + 1
    }

    //Palvras obrigatórias, para diferenciar perguntas de programação de perguntas casuais
    while (mandatoryState != undefined) {
        let pushMandatoryWord = keywords.includes(mandatory[n])

        if (pushMandatoryWord == true) {
            filteredMandatory.push(mandatory[n])
        }

        if (mandatory[n] == undefined) {
            mandatoryState = undefined
        }

        n = n + 1
    }

    //O embed
    const jaEmbed = {
        color: 0x25282b,
        title: 'Não perguntes para perguntar',
        url: 'https://dontasktoask.com/pt-pt/',
        thumbnail: {
            url: 'https://dontasktoask.com/favicon.png'
        }
    }

    //Primeiro critério que defini para considerar uma pergunta "mal-feita"
    if (keywords.length < 16 && filteredCompare.length > 0 && filteredMandatory.length > 0) {       
        bot.createMessage(msg.channel.id ,{ content: ['👉 https://dontasktoask.com/pt-pt/'], embeds: [jaEmbed] })
    }

    else if (keywords.length < 12 && filteredCompare.length > 0 && keywords.includes("?")) {
        bot.createMessage(msg.channel.id ,{ content: ['👉 https://dontasktoask.com/pt-pt/'], embeds: [jaEmbed] })
    }

    i = 0
    n = 0

    filteredCompare = []
    filteredMandatory = []

    compareState = ""
    mandatoryState = ""
})

bot.connect()
