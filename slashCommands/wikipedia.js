const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageActionRow,MessageButton } = require('discord.js');
const wikipedia = require("./../api/wikipediaAPI")

module.exports = {
	data: new SlashCommandBuilder()
		.setName('wikipedia')
		.setDescription('Ricerca su wikipedia')
		.addStringOption(option => option.setName('ricerca').setDescription('Cosa cercare').setRequired(true)),
	async execute(interaction) {
        await interaction.deferReply();
        const tosearch = interaction.options.getString('ricerca');
        var rows = [];
        var row = new MessageActionRow();
        await wikipedia.getSearchResults(tosearch)
        .then((risultati) => {
            var i = 0;
            Object.values(risultati).forEach(element => {
                row.addComponents(new MessageButton()
                .setCustomId('wikisearch'+i)
                .setLabel(element)
                .setStyle('PRIMARY'))
                i++;
                if (i%4==0){
                    rows.push(row);
                    row = new MessageActionRow();
                }
            });
            if (i%4!=0){
                rows.push(row);
            }
            return interaction.editReply({ content: 'Seleziona la pagina tra i risultati di ricerca', components: [...rows]});
        })
        .catch((exception) => console.log(exception));
	},
};