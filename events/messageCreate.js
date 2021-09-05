const config = require("../config.json");

module.exports = {
    name: "messageCreate",
    async execute(message){
        if(message.author.bot || !message.guild || !message.content.startsWith(config.prefix)) return;
        const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
        const cmd = args.shift().toLowerCase();
    
        let command = message.client.messageCommands.get(cmd)
        if(!command) return;
    
        if (command.botPermissions) {
            const Permissions = command.botPermissions.filter(x => !message.guild.me.permissions.has(x)).map(x => "`" + x + "`")
            if (Permissions.length) return message.channel.send(`Il bot deve avere i permessi ${Permissions.join(", ")} per eseguire il comando`)
        } 
          
        if (command.memberPermissions) {
            const Permissions = command.memberPermissions.filter(x => !message.member.permissions.has(x)).map(x => "`" + x + "`")
            if (Permissions.length) return message.channel.send(`Devi avere i permessi ${Permissions.join(", ")} per eseguire il comando`)
        }
        
        if (command.ownerOnly) {
            if (!config.owners.includes(message.author.id)) return message.channel.send("Questo comando puo essere esguito solo dal creatore del bot")
        }
        command.execute(message,args);
    }
}