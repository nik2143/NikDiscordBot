const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');
const { getImage } = require('random-reddit');
const config = require("../config.json");

module.exports = {
	data: new SlashCommandBuilder()
		.setName('meme')
		.setDescription('Invia meme random'),
	async execute(interaction) {
        if (interaction.channelId !== config.memeChannel){
          return interaction.reply({ content: "Questo comando può essere usato solo nel canale meme", ephemeral: true});
        }
        await interaction.deferReply();
        var tries = 0;
        async function getMeme(){
          try{
            return await getImage('memesITA');
          } catch (error) {
            if (tries<3){
              tries++;
              getMeme();
            } else {
              throw(error);
            }
          }
        }
        var meme = await getMeme();
        return interaction.editReply({files: [{attachment: meme}]});
	},
};