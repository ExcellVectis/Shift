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
  client.user.setActivity(`sc!Help | sc!Invite`, { type: 'WATCHING' });
  console.log(`Logged In As ${client.user.tag}!`);
});

client.on('guildMemberAdd', member => {
  client.guilds.get("425708600900583427");
  member.addRole(member.guild.roles.find("name","Subscriber"));  
});


const Webhook = require("webhook-discord")

const Hook = new Webhook("https://discordapp.com/api/webhooks/425737445603147796/oGrZnqM8eKQUsAp0M46pvysHmJUFSUWgm7zfWC23TpBXhvbqMc-hTMT4LvMNUxGUgPwC")

client.on("guildCreate", guild => {
  Hook.custom("Shift-Server-Logs",`I Have Been Added To ${guild.name}`,"Server Added","#0cd80a")
});

client.on("guildDelete", guild => {
  Hook.custom("Shift-Server-Logs",`I Have Been Removed From ${guild.name}`,"Server Leave","#ce0000")
});

const prefix = 'sc!';

client.on("message", async message => {
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
  await message.react(client.emojis.find('name', 'GreenGood'))
  const embed = new Discord.RichEmbed()
  .setColor(`d7f706`)
  .addField('Shift Commands', 'Here Is My Command List')
  .addField('Information', 'Ping - Measures The Bot Latency\n\nStats - Gives Some Useful Bot Statistics')
  .addField('Fun', 'Roll - This Will Roll The Dice\n\nSay - The Bot Will Mock You')
  .addField('Moderation', 'Warn - Warn A Member\n\nKick - Kick A Member\n\nBan - Ban A Member')
  .addField('Utility', 'Server - Gives Server Information\n\nInvite - Invite Shift To Your Server')
  .addField('Owner', 'Embed - Embeds Sentence That You Put')
  .addField('NSFW', 'Neko - This Returns A Neko')
  message.author.send({embed});
 } 
  
  if (command === 'ping') {
  message.channel.send(`Pong \`${Date.now() - message.createdTimestamp}MS\``);
 }
  
if (command === 'roll') {
 return message.reply(`You Rolled A ${Math.floor((Math.random() * 6) + 1)}`); 
}
  
 if (command === 'say') {
 return message.reply(message.content.substring('sc! '.length));
 } 
  
 if (command === 'server') {
  const embed = new Discord.RichEmbed()
  .addField('Server Information', `Here Is This Servers Information!`)
  .addField('Members', `${message.guild.members.filter(member => member.user.bot).size} Bots Of ${message.guild.memberCount} Members`)
  .addField('Channels', `${message.guild.channels.filter(chan => chan.type === 'voice').size} Voice Channels And ${message.guild.channels.filter(chan => chan.type === 'text').size} Text Channels`)
  .addField('Server Owner', `${message.guild.owner.user.tag}`)
  .setColor(`ce0000`)
  message.channel.send({embed});
 } 
  
  if (command === 'warn') {
      if(!message.member.roles.some(r=>["Moderator", "moderator"].includes(r.name)) )
    
      return message.reply("Sorry, You Don't Have Permission To Use This Command!");
    
    let member = message.mentions.members.first();
    if(!member)
      return message.reply("Please Mention A Valid User Of This Server!")

     let reason = args.slice(1).join(' ');
     if(!reason)
      return message.reply("Please Indicate A Reason For This Warn!");
           const channel = member.guild.channels.find('name', 'mod-logs');
           if (!channel) return;

    channel.send(`${member.user} Has Been Warned By Moderator ${message.author.tag} Because Of ${reason}`);
  }
  
  
  if (command === 'embed') {
  if(message.author.id !== '425028781724532736') return message.reply('Sorry Only The `Bot Owner` Can Use This Command');
  const embed = new Discord.RichEmbed()
  .setColor('RANDOM')
  .setDescription(message.content.substring('sc! '.length));
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
  
if (command === 'kick') {
 if(!message.member.roles.some(r=>["Administrator", "Moderator", "administrator", "moderator"].includes(r.name)) )
 return message.reply("Sorry, You Don't Have Permission To Use This Command!");
  
  let member = message.mentions.members.first();
    if(!member)
      return message.reply("Please Mention A Valid User Of This Server!");
    if(!member.kickable) 
      return message.reply("I Cannot Kick This User, Please Check All My Permissions!");
  
  let reason = args.slice(1).join(' ');
    if(!reason)
      return message.reply("Please Indicate A Reason For The Kick");

    await member.kick(reason)
             const channel = member.guild.channels.find('name', 'mod-logs');
             if (!channel) return;
  
    channel.send(`${member.user.tag} Has Been Kicked By Moderator ${message.author} Because Of ${reason}`);
}
  
  if (command === 'ban') {

 if(!message.member.roles.some(r=>["Administrator", "Moderator", "administrator", "moderator"].includes(r.name)) )
 return message.reply("Sorry, You Don't Have Permission To Use This Command!");
  
  let member = message.mentions.members.first();
    if(!member)
      return message.reply("Please Mention A Valid User Of This Server!");
    if(!member.bannable) 
      return message.reply("I Cannot Kick This User, Please Check All My Permissions!");
  
  let reason = args.slice(1).join(' ');
    if(!reason)
      return message.reply("Please Indicate A Reason For The Kick");

    await member.ban(reason)
             const channel = member.guild.channels.find('name', 'mod-logs');
             if (!channel) return;
  
    channel.send(`${member.user.tag} Has Been Kicked By Moderator ${message.author} Because Of ${reason}`);
  }  
    
    
if (command === 'invite') {
 const embed = new Discord.RichEmbed()
 .setTitle('Invite Me')
 .setColor(`da0fbc`)
 .setDescription(`Invite Shift To Your Guild [Here](https://discordapp.com/api/oauth2/authorize?client_id=425720956506341387&permissions=536210502&scope=bot)\n\nJoin The Support Guild [Here](https://discord.gg/ddqD2Vu)`)
 message.channel.send({embed});
}
  

  
  
  
});

client.login(process.env.TOKEN);