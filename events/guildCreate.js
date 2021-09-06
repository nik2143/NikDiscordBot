const config = require("../config.json");

module.exports = {
    name: "guildCreate",
    async execute(guild){
        if (config.allowedGuilds.length==0) return;
        if (!config.allowedGuilds.includes(guild.id)){
            guild.fetchOwner().then((owner)=>{
                owner.createDM().then((dm)=>{
                    dm.send("You can't use this bot on server "+guild.name+"\nNon puoi usare questo bot nel server "+guild.name);
                })
                guild.leave();
            })
        }
    }
}