const wikipedia = require("./../api/wikipediaAPI")
const { MessageEmbed } = require('discord.js');

module.exports = {
    name: "interactionCreate",
    async execute(interaction){
        if (interaction.isButton()){
            if (interaction.customId.includes("wikisearch")){
                await interaction.deferUpdate();
                await wikipedia.getInfo(interaction.component.label)
                .then(res=>{
                    const infoEmbed = new MessageEmbed() 
                    .setTitle(interaction.component.label)
                    .setDescription(res)
                    .setColor("ORANGE")
                    .setFooter("Bot mantenuto da nik2143#2237","https://cdn.discordapp.com/avatars/303461696092241920/e5865465542bacdfcf210754076b6930.webp");
                    interaction.editReply({ embeds: [infoEmbed] , components:[]})
                })
                .catch(ex=>console.log(ex))
            }
        }
        if (interaction.isCommand()){
            const command = interaction.client.slashCommands.get(interaction.commandName);
            if (!command) return;
            try {
                await command.execute(interaction);
            } catch (error) {
                console.error(error);
                if (interaction.deferred || interaction.replied){
                    return interaction.editReply({ content: "Errore durante l'esecuzione del comando!" , ephemeral: true });
                }
                return interaction.reply({ content: "Errore durante l'esecuzione del comando!" , ephemeral: true });
            }
        }
    }
}