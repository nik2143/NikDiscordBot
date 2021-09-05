module.exports = {
    name: "ready",
    async execute(client){
        client.user.setActivity('I fatti tuoi', { type: "WATCHING" });
        console.log("ready");
        client.setupCommands();
    }
}