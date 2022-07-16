module.exports = {
    name: 'JustAsk',
    description: "Este comando é ativado sempre que alguém manda uma mensagem para o servidor",
    execute(message, client) {
        if (message.author.bot) return

        //Variáveis para ver individualmente todos os elementos, o {i} para o compare[] e o {n} para o mandatory[]. Depois se estes elementos estiverem na frase original (keywords), são adicionadas ao filteredCompare/filteredMandatory
        let i = 0
        let n = 0
    
        let compare = ["alguém", "alguem", "algum", "preciso", "precisava", "ajuda", "ajudar", "problema", "consegue", "malta", "gente", "programa", "algo", "codificação", "codificacão", "codificaçao", "codificacao"]
        let mandatory = ["copilot", "android", "ios", "linux", "ubuntu", "manjaro", "mint", "windows", "java", "javascript", "js", "typescript", "ts", "kotlin", "html", "css", "c", "c#", "c++", "py", "python", "rust", "ruby", "pearl", "assembly", "shell", "bash", "haskell", "swift", "scala", "golang", "clojure", "net", "f#", "php", "game", "gamedev", "dev", "ops", "devops", "seguranca", "security", "backend", "back", "end", "iot", "system", "react", "vue", "angular", "node", "npm", "tkinter", "código", "codigo", "system", "códigos", "puppeteer"]

        let filteredCompare:any[] = []
        let filteredMandatory:any[] = []
    
        let compareState = 0
        let mandatoryState = 0
    
        //Dá o número de pontos finais e vírgulas numa mensagem ---ainda não implementado, a usar mais tarde---
        const totalPonctuation = message.content.split(/[.,(){}]/).length - 1
    
        //Divide a frase para apenas ficarem palavras sem pontuação
        const keywords = message.content.replace(/[.,!_]/, " ").replace(/(\r\n|\n|\r)/g, " ").replace("?", " ?").toLowerCase().split(" ")
    
        //Palvras a comparar, para saber se se trata realmente de uma pergunta
        while (compareState != 1) {
            let pushCompareWord = keywords.includes(compare[i])
    
            if (pushCompareWord) {
                filteredCompare.push(compare[i])
            }
    
            if (compare[i] == undefined) {
                compareState = 1
            }
    
            i = i + 1
        }
    
        //Palvras obrigatórias, para diferenciar perguntas de programação de perguntas casuais
        while (mandatoryState != 1) {
            let pushMandatoryWord = keywords.includes(mandatory[n])
    
            if (pushMandatoryWord) {
                filteredMandatory.push(mandatory[n])
            }
    
            if (mandatory[n] == undefined) {
                mandatoryState = 1
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
            client.createMessage(message.channel.id, { content: '👉 https://dontasktoask.com/pt-pt/', embeds: [jaEmbed] })
        }
    
        else if (keywords.length < 12 && filteredCompare.length > 0 && keywords.includes("?")) {
            client.createMessage(message.channel.id, { content: '👉 https://dontasktoask.com/pt-pt/', embeds: [jaEmbed] })
        }
    }
}