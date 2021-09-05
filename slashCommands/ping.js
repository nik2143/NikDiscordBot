const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');


module.exports = {
	data: new SlashCommandBuilder()
		.setName('ping')
		.setDescription('Visualizza la latenza del bot'),
	async execute(interaction) {
        interaction.deferReply({fetchReply:true}).then (async (msg) =>{
            const pingembed = new MessageEmbed()
            .setTitle('🏓PING')
            .addField("Ping Bot",`${msg.createdTimestamp - interaction.createdTimestamp}ms`,true)
            .addField("Ping Api", `${Math.round(interaction.client.ws.ping)}ms`,true)
            .setColor('YELLOW')
            return interaction.editReply({ embeds: [pingembed] });
        })
	},
};