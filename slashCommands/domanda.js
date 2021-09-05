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
            .setFooter("Bot mantenuto da nik2143#2237\nDomande fornite da Mr. Dick#6384","https://cdn.discordapp.com/avatars/303461696092241920/e5865465542bacdfcf210754076b6930.webp");
            return interaction.editReply({ embeds: [answerembed] });
        })
	},
};