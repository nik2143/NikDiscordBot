const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');
const utils = require("./../utils")
const Cryptr = require('cryptr');
const cryptr = new Cryptr(process.env.DECRYPT-PASSWORD);
let replies = JSON.parse(cryptr.decrypt(require("../data/8ballanswers.json")));

module.exports = {
	data: new SlashCommandBuilder()
		.setName('8ball')
		.setDescription('Fai una domanda al vecchio saggio, lui ti saprà rispondere (forse).')
        .addStringOption(option=>option.setName("domanda").setDescription("La domanda da fare al saggio").setRequired(true)),
	async execute(interaction) {
        await interaction.deferReply();
        let question = interaction.options.getString('domanda');
        let embed = new MessageEmbed()
        .setTitle("🦉Vecchio Saggio🦉")
        .setColor("#AA9900")
        .addField("Domanda", question)
        .addField("Risposta dal saggio", replies[utils.getRandomIndex(replies)])
        interaction.editReply({ embeds: [embed] , components:[]})
	},
};