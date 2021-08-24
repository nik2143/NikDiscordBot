const Discord = require("discord.js");
const utils = require("./utils.js")
const psycatgames = require("./api/psycatapi.js");
const truthOrDareGame = require("./api/truthOrDareGameAPI.js");
const questoOQuello = require("./api/questoOQuelloAPI.js");
const wikipedia = require("./api/wikipediaAPI.js");
const client = new Discord.Client({ intents: [Discord.Intents.FLAGS.GUILDS, Discord.Intents.FLAGS.GUILD_MESSAGES] });
const keepAlive = require("./server.js")
const sitiDomande = ["psycat","truthordaregame"];

client.login(process.env.BOT_TOKEN);
keepAlive();

client.on("ready",()=> {
    client.user.setActivity('I fatti tuoi', { type: "WATCHING" });
    console.log("ready");
})

client.on("guildCreate",()=> {
    const data = {
        name: 'domanda',
        description: 'Manda una domanda casuale',
        options: [{
            name: 'tipo',
            type: 'STRING',
            description: 'La tipologia di domanda',
            required: false,
            choices: [
                {
                    name: 'Lista',
                    value: 'list',
                },
                {
                    name: 'Casuale',
                    value: 'random',
                },
            ],
        }],
    };
    const commands = client.api.applications(client.user.id).commands.set(data);
    console.log(commands);
})


client.on('messageCreate', async message => {
	if (!client.application?.owner) await client.application?.fetch();
    if (message.content.toLowerCase().split(" ")[0]==="testcommand"){

    }
    if (message.content.toLowerCase() === '!setupcommands' && message.author.id === client.application?.owner.id) {
        const data = [
        {
            name: 'domanda',
            description: 'Manda una domanda casuale',
            options: [],
        },
        {
            name: 'ship',
            description: "Crea una ship",
            options: [
                {
                    name: 'utente1',
                    type: 'USER',
                    description: 'Utente 1 della ship',
                    required: true,  
                },
                {
                    name: 'utente2',
                    type: 'USER',
                    description: 'Utente 2 della ship',
                    required: false,  
            }],
        },
        {
            name: 'preferiresti',
            description: "Ottieni una domanda del tipo questo o quello",
            options: [],
        },
        {
            name: 'wikipedia',
            description: 'Ricerca su wikipedia',
            options: [{
                name: 'ricerca',
                type: 'STRING',
                description: 'Cosa cercare',
                required: true,
                choices: [],
            }],
        },
    ];
    const commands = await client.guilds.cache.get('867415233235910666')?.commands.set(data);
    console.log(commands);
    }
})

client.on('interactionCreate', async interaction => {
    if (interaction.isButton()){
        if (interaction.customId.includes("wikisearch")){
            await interaction.deferUpdate();
            await wikipedia.getInfo(interaction.component.label)
            .then(res=>{
                const infoEmbed = new Discord.MessageEmbed() 
                .setTitle(interaction.component.label)
                .setDescription(res)
                .setColor("ORANGE");
                interaction.editReply({ embeds: [infoEmbed] , components:[]})
            })
            .catch(ex=>console.log(ex))
        }
    }
	if (interaction.isCommand()){
        if (interaction.commandName === 'domanda') {
            await interaction.deferReply();
            const { value: type } = interaction.options.get('tipo');
            if (type.valueOf() === "random"){
            var sito = sitiDomande[utils.getRandomIndex(sitiDomande)]
            switch (sito){
                case "psycat":
                   await psycatgames.getQuestion()
                    .then((domanda) => message.channel.send(domanda))
                    .catch((errore) => console.log(errore))
                   break;
                case "truthordaregame":
                    await truthOrDareGame.getQuestion()        
                    .then((domanda) => message.channel.send(domanda))
                    .catch((errore) => console.log(errore));
                    break
            }
            }
            if(type.valueOf() === "list"){
                await interaction.editReply('Non dovevi scoprire questo , per ora non serve ma in futuro potrebbe servire!');
            }
        }
        if (interaction.commandName === 'ship'){
            const user1 = interaction.options.getUser('utente1');
            const user2 = interaction.options.getUser('utente2');
            if (!user2) user2 ===interaction.user;
            if(user1 === interaction.user && user2===interaction.user) return await interaction.reply({ content: 'Please mention someone and not yourself', ephemeral: true });
            let RN = Math.floor(Math.random() * 100) + 1
    
            const UnloveEmbed = new Discord.MessageEmbed() 
            .setTitle('This isn\'t a match')
            .setThumbnail('https://cdn.discordapp.com/attachments/824906735176253450/828554687229067275/images.png')
            .setDescription(`${user1} shipped with ${user2} and it is ${RN}%`)
            .setColor("RED")
        
            const loveEmbed = new Discord.MessageEmbed() 
            .setTitle('They are born for each others')
            .setThumbnail('https://cdn.discordapp.com/attachments/824906735176253450/828555115593859123/9k.png')
            .setDescription(`${user1} shipped with ${user2} and it is ${RN}%`)
            .setColor("GREEN")
        
            if(RN > 50) {
                await interaction.reply({ embeds: [loveEmbed] });
            } else {
                await interaction.reply({ embeds: [UnloveEmbed] });
            }
        }
        if (interaction.commandName === 'preferiresti'){
            await interaction.deferReply();
            await questoOQuello.getQuestions()
            .then((domande) => {
                const row = new Discord.MessageActionRow()
                .addComponents(
                    new Discord.MessageButton()
                        .setCustomId('primary')
                        .setLabel(domande[0])
                        .setStyle('DANGER')
                        .setDisabled(true),
                    new Discord.MessageButton()
                        .setCustomId('secondary')
                        .setLabel(domande[1])
                        .setStyle('SUCCESS')
                        .setDisabled(true),
                );
                interaction.editReply({ content: 'Preferiresti', components: [row] });
            })
            .catch(ex=>console.log(ex));
        }
        if (interaction.commandName==='wikipedia'){
            await interaction.deferReply();
            const tosearch = interaction.options.getString('ricerca');
            var rows = [];
            var row = new Discord.MessageActionRow();
            await wikipedia.getSearchResults(tosearch)
            .then((risultati) => {
                var i = 0;
                Object.values(risultati).forEach(element => {
                    row.addComponents(new Discord.MessageButton()
                    .setCustomId('wikisearch'+i)
                    .setLabel(element)
                    .setStyle('PRIMARY'))
                    i++;
                    if (i%4==0){
                        rows.push(row);
                        row = new Discord.MessageActionRow();
                    }
                });
                if (i%4!=0){
                    rows.push(row);
                }
                interaction.editReply({ content: 'Seleziona la pagina tra i risultati di ricerca', components: [...rows]});
            })
            .catch((errore) => console.log(errore));
        }
    }
});