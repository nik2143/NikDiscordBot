const { SlashCommandBuilder } = require('@discordjs/builders');
const questions = require("./../questions.js")
const { MessageEmbed } = require('discord.js');


module.exports = {
	data: new SlashCommandBuilder()
		.setName('domanda')
		.setDescription('Chat morta? Esegui questo comando per fare conversazione!'),
	async execute(interaction) {
        await interaction.deferReply();
        await questions.getQuestion().then((question)=>{
            const answerembed = new MessageEmbed()
            .addField('⭐Domanda⭐', question)
            .setColor('YELLOW')
            return interaction.editReply({ embeds: [answerembed] });
        })
	},
};