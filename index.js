const Discord = require("discord.js");
const moment = require("moment");
require("moment-duration-format");
const snekfetch = require("snekfetch");
const client = new Discord.Client();

const http = require('http');
const express = require('express');
const app = express();
app.get("/", (request, response) => {
  console.log(Date.now() + " Ping Received");
  response.sendStatus(200);
});
app.listen(process.env.PORT);
setInterval(() => {
  http.get(`http://${process.env.PROJECT_DOMAIN}.glitch.me/`);
}, 280000);


   

client.on("ready", () => {
     
  client.user.setStatus('dnd')
  client.user.setActivity(`$Help | $Invite`, { type: 'WATCHING' });
  console.log(`Logged In As ${client.user.tag}!`);
});

client.on('guildMemberAdd', member => {

  this.client.guilds.get("GuildIDHere");
  if(member.guild.roles.find("name","Subscriber"))
  member.addRole(member.guild.roles.find("name","Subscriber"));  
});


const Webhook = require("webhook-discord")

const Hook = new Webhook("WebhookLinkHere")

client.on("guildCreate", guild => {
  guild.createChannel("nsfw-access","nsfw-access")
  Hook.custom("Shift-Server-Logs",`I Have Been Added To ${guild.name}`,"Server Added","#0cd80a")
});

client.on("guildDelete", guild => {
  Hook.custom("Shift-Server-Logs",`I Have Been Removed From ${guild.name}`,"Server Leave","#ce0000")
});

const prefix = '$';

client.on("message", async message => {
  const Log = require("webhook-discord")
  const web = new Log("https://discordapp.com/api/webhooks/425737445603147796/oGrZnqM8eKQUsAp0M46pvysHmJUFSUWgm7zfWC23TpBXhvbqMc-hTMT4LvMNUxGUgPwC")
  
  
if (message.author.bot) return;
  if(message.content.indexOf(prefix) !== 0) return;
  const args = message.content.slice(prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();
  
 if (command === 'stats') {
 const duration = moment.duration(client.uptime).format(" D [Days], H [Hours], m [Minutes], s [Seconds]");
 const embed = new Discord.RichEmbed()
 .setTitle('Shift Statistics')
 .setColor(`020202`)
 .setDescription(`Memory Usage: ${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)}MB\n\nUptime: ${duration}\n\nNode: 9.3.0\n\nLibrary: Discord.JS\n\nBot Version: 1.0.2\n\nServers: ${client.guilds.size}\n\nHost: ${process.env.HOST}`)
 message.channel.send({embed});
 }
  
 if (command === 'help') {
  const embed = new Discord.RichEmbed()
  .setColor(`d7f706`)
  .addField('Shift Commands', 'Here Is My Command List')
  .addField('Information', 'Ping - Measures The Bot Latency\n\nStats - Gives Some Useful Bot Statistics')
  .addField('Fun', 'Roll - This Will Roll The Dice\n\nSay - The Bot Will Mock You')
  .addField('Utility', 'Server - Gives Server Information\n\nInvite - Invite Shift To Your Server\n\nUserInfo - Return\'s A Users Info\n\nAvatar - Return\'s A Users Avatar')
  .addField('Owner', 'Embed - Embeds Sentence That You Put')
  .addField('NSFW', 'Neko - This Returns A Neko')
  message.channel.send({embed});
 } 
  
  if (command === 'ping') {
  message.channel.send(`Pong \`${Date.now() - message.createdTimestamp}MS\``);
 }
  
if (command === 'roll') {
 return message.reply(`You Rolled A ${Math.floor((Math.random() * 6) + 1)}`); 
}
  
 if (command === 'say') {
 return message.reply(message.content.substring('$say '.length));
 } 
  
 if (command === 'server') {
  const embed = new Discord.RichEmbed()
  .addField('Server Information', `Here Is This Servers Information!`)
  .addField('Server Name', `${message.guild.name}`)
  .addField('Members', `${message.guild.members.filter(member => member.user.bot).size} Bots Of ${message.guild.memberCount} Members`)
  .addField('Channels', `${message.guild.channels.filter(chan => chan.type === 'voice').size} Voice Channels And ${message.guild.channels.filter(chan => chan.type === 'text').size} Text Channels`)
  .addField('Server Owner', `${message.guild.owner.user.tag}`)
  .addField('Server Created', `${message.guild.createdAt}`)
  .setThumbnail(`${message.guild.iconURL}`)
  .setColor(`ce0000`)
  message.channel.send({embed});
 } 
  

  if (command === 'eval') {
  if(message.author.id !== '425028781724532736') return message.reply('Sorry Only The `Bot Owner` Can Use This Command');
  const script = message.content.substring('$eval '.length);
	const result = eval(script);
	return message.reply(result.toString());
  }
  
  if (command === 'embed') {
  if(message.author.id !== '425028781724532736') return message.reply('Sorry Only The `Bot Owner` Can Use This Command');
  const embed = new Discord.RichEmbed()
  .setColor('RANDOM')
  .setDescription(message.content.substring('$embed '.length));
  message.channel.send({embed}); 
  }
 
  
if (command === 'neko') {
 if (!message.channel.nsfw) return message.reply("Please Use This In A NSFW Channel!");

 const { body } = await snekfetch.get(`https://nekos.life/api${Math.random() >= 0.5 ? "/lewd" : ""}/neko`);
 const embed = new Discord.RichEmbed()
 .setTitle('Neko')
 .setImage(`${body.neko}`)
 .setColor(`020202`)
 message.channel.send({embed});
} 

    
    
if (command === 'invite') {
 const embed = new Discord.RichEmbed()
 .setTitle('Invite Me')
 .setColor(`da0fbc`)
 .setDescription(`Invite Shift To Your Guild [Here](https://discordapp.com/api/oauth2/authorize?client_id=425720956506341387&permissions=536210518&scope=bot)\n\nJoin The Support Guild [Here](https://discord.gg/ddqD2Vu)`)
 message.channel.send({embed});
}
  

if (command === 'clusters') {
 message.reply('Soon:tm:')
} 
  
  if (command === 'nsfw') {
    message.member.addRole(message.member.guild.roles.find("name","NSFW"));  
    return message.reply('You Have Been Given The `NSFW` Role');
    
  }
  
  if (command === 'userinfo') {
    var member = message.mentions.members.first() || message.member; 
  const embed = new Discord.RichEmbed()
  .addField('Username', `${member.user.username}`)
  .addField('Discriminator', `${member.user.discriminator}`)
  .addField('User ID', `${member.user.id}`)
  .setColor(`0c21ce`)
  message.channel.send({embed});
  }
  

  
  if (command === 'avatar') {
    var member = message.mentions.members.first() || message.member; 
   const embed = new Discord.RichEmbed()
   .setTitle(`${member.user.username}'s Avatar`)
   .setImage(member.user.avatarURL)
   .setColor(`0c21ce`)
   message.channel.send({embed});
  }
});

client.on("message", async message => {
    if (message.content.startsWith("sa")) {
      message.react("🇦")
      message.react("🇸")
    return message.channel.send("Aleyküm Selam");
    }
  
  
  
});

client.login(process.env.TOKEN);
