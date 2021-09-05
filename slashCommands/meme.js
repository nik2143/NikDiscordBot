const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');
const { getImage } = require('random-reddit')


module.exports = {
	data: new SlashCommandBuilder()
		.setName('meme')
		.setDescription('Invia meme random'),
	async execute(interaction) {
        await interaction.deferReply();
        const meme = await getImage('memesITA')
        return interaction.editReply({files: [{attachment: meme}]});
        
	},
};