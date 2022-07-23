module.exports = {
    name: 'roles', 
    description: "Este comando recebe as interações do reaction role!",
    async execute(interaction) {

        await interaction.acknowledge()
                
        const { data, member } = interaction

        const components = interaction.message.components[0].components[0]
        const removed = components.options.filter((option) => {
          return !data.values.includes(option.value)
        })
  
        for (const id of removed) {
          member.removeRole(id.value)
        }
  
        for (const id of data.values) {
          member.addRole(id)
        }

        interaction.createFollowup({ content: "Roles Atualizados!", flags: 64 }).catch(error => { console.error('Erro ao enviar mensagem efémera:', error) })
    }
}