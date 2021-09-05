const {MessageMentions,Util} = require("discord.js");


module.exports = {
    name: "move",
    description: "Sposta un messaggio",
    botPermissions: ["MANAGE_WEBHOOKS"],
    memberPermissions: ["MANAGE_MESSAGES"],
    async execute(message,args) {
		if (!args[0]) {
			message.channel.send('Uso: `=move <canale in cui spostare>`').then((msg)=>{
                setTimeout(() => {
                    message.delete();
                    msg.delete()
                }, 5000);
            });;
			return;
		}

        var tomove = message.reference;

		if (!tomove) {
			message.channel.send('Devi rispondere a un messaggio per spostarlo').then((msg)=>{
                setTimeout(() => {
                    message.delete();
                    msg.delete()
                }, 5000);
            });
			return;
		}

		if (!MessageMentions.CHANNELS_PATTERN.test(args[0])) {
			message.channel.send('Canale inserito non valido').then((msg)=>{
                setTimeout(() => {
                    message.delete();
                    msg.delete()
                }, 5000);
            });
			return;
		}

		var toChannel = await message.guild.channels.fetch(args[0].replace(/<#|>/g, '').replace(" ",""));
		if (!toChannel) {
			message.channel.send('Impossibile trovare il canale menzionato').then((msg)=>{
                setTimeout(() => {
                    message.delete();
                    msg.delete()
                }, 5000);
            });
			return;
		}

		if (toChannel.type !== 'GUILD_TEXT') {
			message.channel.send('Il canale menzionato non è un canale di testo').then((msg)=>{
                setTimeout(() => {
                    message.delete();
                    msg.delete()
                }, 5000);
            });
			return;
		}

		if (!toChannel.permissionsFor(message.member).has('SEND_MESSAGES')) {
			message.channel.send('Non puoi spostare messaggi in un canale in cui non puoi mandarne').then((msg)=>{
                setTimeout(() => {
                    message.delete();
                    msg.delete()
                }, 5000);
            });
			return;
		}

		var fromChannel = message.channel;

		var m = await message.channel.send('Spostamento Messaggio');

		fromChannel.messages.fetch(tomove.messageId).then(async (msg) => {
			var wbs = await toChannel.fetchWebhooks();
			if (wbs.size < 1) var wb = await toChannel.createWebhook('Sposta messaggi');
			else var wb = wbs.first();
			wb.send({content: msg.content,username: msg.author.username, avatarURL: msg.author.avatarURL(), embeds: msg.embeds, files: Array.from(msg.attachments.values()) }).then(() => {
				m.edit('Messaggio spostato da ' + Util.escapeMarkdown(msg.author.tag) + ' da ' + fromChannel.toString() + ' a ' + toChannel.toString());
                message.delete();
			}).catch((e) => {console.log(e)})
		}).catch((e) => {console.log(e)});
    }
}