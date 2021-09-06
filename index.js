const Discord = require("discord.js");
const fs = require('fs');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const client = new Discord.Client({ intents: [Discord.Intents.FLAGS.GUILDS, Discord.Intents.FLAGS.GUILD_MESSAGES] });
const config = require("./config.json");
const token = process.env.BOT_TOKEN; 
client.login(token);

client.slashCommands = new Discord.Collection();
client.messageCommands = new Discord.Collection();
const slashCommandFiles = fs.readdirSync('./slashCommands').filter(file => file.endsWith('.js'));
const messageCommandFiles = fs.readdirSync('./messageCommands').filter(file => file.endsWith('.js'));
const eventFiles = fs.readdirSync('./events').filter(file => file.endsWith('.js'));

for (const file of slashCommandFiles) {
	const command = require(`./slashCommands/${file}`);
	client.slashCommands.set(command.data.name, command);
    console.log(command.data.name + " registrato");
}

for (const file of messageCommandFiles) {
	const command = require(`./messageCommands/${file}`);
	client.messageCommands.set(command.name, command);
    console.log(command.name + " registrato");
}

for (const file of eventFiles) {
	const event = require(`./events/${file}`);
	client.on(event.name,(...args) => event.execute(...args))
    console.log("Started listening "+event.name);
}