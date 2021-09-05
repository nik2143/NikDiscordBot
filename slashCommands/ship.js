const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('ship')
		.setDescription('Crea una ship')
        .addUserOption(option=>option.setName("utente1").setDescription("Utente 1 della ship").setRequired(true))
        .addUserOption(option=>option.setName("utente2").setDescription("Utente 2 della ship").setRequired(false)),
	async execute(interaction) {
        await interaction.deferReply();
        const user1 = interaction.options.getUser('utente1');
        const user2 = interaction.options.getUser('utente2');
        if (!user2) user2 === interaction.user;
        if(user1 === interaction.user && user2===interaction.user) return await interaction.reply({ content: 'Inserisci un altro utente non te stesso', ephemeral: true });
        let RN = Math.floor(Math.random() * 100) + 1

        const UnloveEmbed = new Discord.MessageEmbed() 
        .setTitle('Sarà per la prossima volta...')
        .setThumbnail('https://cdn.discordapp.com/attachments/824906735176253450/828554687229067275/images.png')
        .setDescription(`${user1} shipped with ${user2} and it is ${RN}%`)
        .setColor("RED")
    
        const loveEmbed = new Discord.MessageEmbed() 
        .setTitle('È sbocciato un nuovo amore')
        .setThumbnail('https://cdn.discordapp.com/attachments/824906735176253450/828555115593859123/9k.png')
        .setDescription(`${user1} shipped with ${user2} and it is ${RN}%`)
        .setColor("GREEN")
    
        if(RN > 50) {
            return interaction.reply({ embeds: [loveEmbed] });
        } else {
            return interaction.reply({ embeds: [UnloveEmbed] });
        }
	},
};