import { ActionRow, Message } from "eris"

module.exports = {
    name: 'roles', 
    description: "Este comando cria um dropdown menu para escolheres o teu role!",
    execute(message:Message, client) {
        const guild = client.guilds.get("730385704592343083") //IGNORAR 811194465993097246
        const staffrole = guild.roles.find(role => role.name === "Moderador") //O role do staff, para só ele poder mandar o comando !dropdown
        const staffid = staffrole.id
        const membro = guild.members.get(message.author.id)

        if (!membro.roles.includes(staffid)) {
            return
        } else {
            message.delete()

            const one = guild.roles.find(role => role.name === "C")
            const two =  guild.roles.find(role => role.name === "C++")
            const three =  guild.roles.find(role => role.name === "C#")
            const four =  guild.roles.find(role => role.name === "Clojure")
            const five =  guild.roles.find(role => role.name === "Golang")
            const six =  guild.roles.find(role => role.name === "F#")
            const seven =  guild.roles.find(role => role.name === "Java")
            const eight =  guild.roles.find(role => role.name === "Javascript")
            const nine =  guild.roles.find(role => role.name === "Haskel")
            const ten =  guild.roles.find(role => role.name === "Kotlin")
            const eleven =  guild.roles.find(role => role.name === "PHP")
            const twelve =  guild.roles.find(role => role.name === "Python")
            const thirteen =  guild.roles.find(role => role.name === "Ruby")
            const fourteen =  guild.roles.find(role => role.name === "Rust")
            const fiftenn =  guild.roles.find(role => role.name === "Swift")
            const sixteen =  guild.roles.find(role => role.name === "Scala")
            const seventeen =  guild.roles.find(role => role.name === ".NET")

            const rowch: ActionRow = {
                type: 1,
                components: [{
                    type: 3,
                    custom_id: "SelectMenu",
                    options: [
                        { label: 'C', value: one.id, emoji: { id: "811738530886713407", name: 'C_' } },
                        { label: 'C++', value: two.id, emoji: { id: "811738530752757762", name: 'Cpp' } },
                        { label: 'C#', value: three.id, emoji: { id: "811738531361063013", name: 'CSharp' } },
                        { label: 'Clojure', value: four.id, emoji: { id: "888592260655095808", name: 'Clojure' } },
                        { label: 'Golang', value: five.id, emoji: { id: "811738531335503912", name: 'Golang' } },
                        { label: 'F#', value: six.id, emoji: { id: "888592732392669254", name: 'Fsharp' } },
                        { label: 'Java', value: seven.id, emoji: { id: "811738531566321724", name: 'Java' } },
                        { label: 'Javascript', value: eight.id, emoji: { id: "888594444708892723", name: 'JavaScript' } },
                        { label: 'Haskel', value: nine.id, emoji: { id: "811738531369844765", name: 'Haskell' } },
                        { label: 'Kotlin', value: ten.id, emoji: { id: "811738531726753812", name: 'Kotlin' } },
                        { label: 'PHP', value: eleven.id, emoji: { id: "811738531239559189", name: 'PHP' } },
                        { label: 'Python', value: twelve.id, emoji: { id: "811738531609182219", name: 'Python' } },
                        { label: 'Ruby', value: thirteen.id, emoji: { id: "811738531415457843", name: 'Ruby' } },
                        { label: 'Rust', value: fourteen.id, emoji: { id: "888593838833283093", name: 'Rust' } },
                        { label: 'Swift', value: fiftenn.id, emoji: { id: "811738531738812436", name: 'Swift' } },
                        { label: 'Scala', value: sixteen.id, emoji: { id: "888593867547480064", name: 'Scala' } },
                        { label: '.NET', value: seventeen.id, emoji: { id: "811738531047276565", name: 'DotNet' } }
                    ],
                    placeholder: "Nada Selecionado...",
                    min_values: 0,
                    max_values: 17
                }]
            }
            
            client.createMessage(message.channel.id, { content: 'Escolha as suas linguagens de programação', components: [rowch] })
        }
    }
}