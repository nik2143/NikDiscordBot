const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');
const utils = require("./../utils")
const Cryptr = require('cryptr');
const cryptr = new Cryptr(process.env.DECRYPT_PASSWORD);
let replies = JSON.parse(cryptr.decrypt(require("../data/storietristi.json")));


module.exports = {
	data: new SlashCommandBuilder()
		.setName('storiatriste')
		.setDescription('Breve storia non molto allegra'),
	async execute(interaction) {
        await interaction.deferReply();
        let embed = new MessageEmbed()
        .addField('Breve storia triste 🪦', `${replies[utils.getRandomIndex(replies)]}`)
        .setColor('BLACK')
        .setFooter("Bot mantenuto da nik2143#2237","https://cdn.discordapp.com/avatars/303461696092241920/e5865465542bacdfcf210754076b6930.webp");
        interaction.editReply({ embeds: [embed] , components:[]})
	},
};