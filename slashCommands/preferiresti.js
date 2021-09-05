const { SlashCommandBuilder } = require('@discordjs/builders');
const questoOQuello = require("./../api/questoOQuelloAPI.js");
const { MessageActionRow,MessageButton } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('preferiresti')
		.setDescription('Ottieni una domanda del tipo questo o quello'),
	async execute(interaction) {
        await interaction.deferReply();
        await questoOQuello.getQuestions()
        .then((domande) => {
            const row = new MessageActionRow()
            .addComponents(
                new MessageButton()
                    .setCustomId('primary')
                    .setLabel(domande[0])
                    .setStyle('DANGER')
                    .setDisabled(true),
                new MessageButton()
                    .setCustomId('secondary')
                    .setLabel(domande[1])
                    .setStyle('SUCCESS')
                    .setDisabled(true),
            );
            return interaction.editReply({ content: 'Preferiresti', components: [row] });
        })
        .catch(ex=>console.log(ex));
	},
};