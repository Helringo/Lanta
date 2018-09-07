const botSettings = require("./botsettings.json");
const Discord = require("discord.js");
const fs = require("fs");

const prefix = botSettings.prefix;

const bot = new Discord.Client({disableEveryone: false});
bot.commands = new Discord.Collection();
bot.mutes = require("./mutes.json");

const responseObject = {
  "Lanta, you there?": "Yes, I'm here~",
  "Marry me Lanta!": "Only if you beat me in a footrace.",
  "Hello there!": "General Kenobi!",
  "Press X to doubt." : ":regional_indicator_x:"
};

const planningPing = {
	" " : " "
};

fs.readdir("./cmds/", (err, files) => {
	if(err) console.error(err);

	let jsfiles = files.filter(f => f.split(".").pop() === "js");
	if(jsfiles.length <= 0) {
		console.log("No commands to load!");
		return;
	}

	console.log(`loading ${jsfiles.length} commands!`);

	jsfiles.forEach((f, i) => {
		let props = require(`./cmds/${f}`);
		console.log(`${i + 1}: ${f} loaded!`);
		bot.commands.set(props.help.name, props);
	});
});

bot.on("ready", async () => {
	console.log(`Bot is ready! ${bot.user.username}`);
	bot.user.setActivity('10h long loli breathing ASMR', { type: 'LISTENING' });
	bot.setInterval(() => {
		for(let i in bot.mutes){
			let time = bot.mutes[i].time;
			let guildId = bot.mutes[i].guild;
			let guild = bot.guilds.get(guildId);
			let member = guild.members.get(i);
			let mutedRole = guild.roles.find(r => r.name === "Muted");
			if(!mutedRole) continue;

			if(Date.now() > time) {
				console.log(`${i} is now able to be unmuted!`);

				member.removeRole(mutedRole);
				delete bot.mutes[i];

				fs.writeFile("./mutes.json", JSON.stringify(bot.mutes), err =>{
					if(err) throw err;
					console.log(`I have unmuted ${member.user.tag}.`);
				});
			}
		}
	}, 5000)
});

bot.on('voiceStateUpdate', (oldMember, newMember) => {
  let newUserChannel = newMember.voiceChannel
  let oldUserChannel = oldMember.voiceChannel


  if(oldUserChannel === undefined && newUserChannel !== undefined) {

     // User Joins a voice channel
	  //Ben's Server
	 if(newMember.guild.id === '375971481688997898'){
	 bot.channels.get('424347348920172554').send('User joined voice channel in LnM');}
	  //QWT
	 if(newMember.guild.id === '378244597362458625'){
	 bot.channels.get('406581467766849546').send("User joined voice channel in QWT " + "@here");}
	  //Squad
	  if(newMember.guild.id === '424271595943755776'){
		 lad = newMember.roles.find("name", "Lad");
	 bot.channels.get('424271595943755778').send(lad.toString() + " zit nu in de voice channel");}
  } else if(newUserChannel === undefined){

    // User leaves a voice channel
	  if(newMember.guild.id === '375971481688997898'){
	 bot.channels.get('424347348920172554').send('User left voice channel in LnM');}
	  //QWT
	 if(newMember.guild.id === '378244597362458625'){
	 bot.channels.get('406581467766849546').send('User left voice channel in QWT');}
  }
});

bot.on("message", async message => {
	if(message.author.bot) return;
	if(message.channel.type === "dm") return;
	if(responseObject[message.content]) {
    		message.channel.send(responseObject[message.content]);
	}
	if(!planningPing && newMember.guild.id === '487364673872723978') {
    		planPing = newMember.roles.find("name", "ping");
		message.channel.send(planPing.toString());
	}
	let messageArray = message.content.split(" ");
	let command = messageArray[0];
	let args = messageArray.slice(1);

	if(!command.startsWith(prefix)) return;

	let cmd = bot.commands.get(command.slice(prefix.length));
	if(cmd) cmd.run(bot, message, args);
});

bot.login(process.env.BOT_TOKEN);
