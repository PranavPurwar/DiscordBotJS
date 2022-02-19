const { Client, Collection, MessageEmbed } = require('discord.js')
const fs = require('fs')
const walletFile = './wallet.json'
const wallet = require(walletFile)
const bankFile = './bank.json'
const bank = require(bankFile)
const prefix = "."

const client = new Client({ intents: ["GUILDS", "GUILD_MESSAGES"] })
client.commands = new Collection()
  
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	// Set a new item in the Collection
	// With the key as the command name and the value as the exported module
	client.commands.set(command.data.name, command);
}


function updateWallet() {
  fs.writeFile(walletFile, JSON.stringify(wallet), err => {
    if (err) throw err
  })
}

function updateBank() {
  fs.writeFile(bankFile, JSON.stringify(bank), err => {
    if (err) throw err
  })
}


client.once('ready', () => {
  client.user.setActivity('Never Gonna Give You Up', {
    type: 'LISTENING',
    url: 'https://youtu.be/dQw4w9WgXcQ'
  })
  console.log('Bot Started Successfully...')
})

client.on('interactionCreate', async interaction => {
	if (!interaction.isCommand()) return;

	const command = client.commands.get(interaction.commandName);

	if (!command) return;

	try {
		await command.execute(interaction);
	} catch (error) {
		console.error(error);
		await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
	}
});
/*
client.on("messageCreate", function(message) {
  var author = message.author.id
  msg = message.content
  if (message.author.bot) return
  if (!msg.startsWith(prefix)) return

  const commandBody = msg.slice(prefix.length)
  const args = commandBody.split(' ')
  const command = args.shift().toLowerCase()

  if (command === "ping") {
    const timeTaken = Date.now() - message.createdTimestamp
    message.reply(`Pong! This message had a latency of ${timeTaken}ms.`)
  }
  else if (command == "create") {
    if (author in wallet) {
      message.reply("Dumb, you already have an account")
      return
    }
    wallet[author] = '5000'
    bank[author] = '5000'
    updateWallet()
    updateBank()
    const embed = new MessageEmbed()
      .setColor('#0099ff')
      .setTitle(`${message.author.username}\'s balance`)
      .setThumbnail(message.author.avatarURL)
      .addFields(
        { name: 'Wallet', value: wallet[author] },
        { name: 'Bank', value: bank[author] }
      )
      .setTimestamp()

    message.reply({ embeds: [embed] })
  }
  else if (command == 'bal') {
    const embed = new MessageEmbed()
      .setColor('#0099ff')
      .setTitle(`${message.author.username}\'s balance`)
      .setThumbnail(message.author.avatarURL)
      .addFields(
        { name: 'Wallet', value: wallet[author] },
        { name: 'Bank', value: bank[author] }
      )
      .setTimestamp()

    message.reply({ embeds: [embed] })
  }
  else if (command == 'kick') {
    let member = message.mentions.members.first();
    if (!member) return message.reply("Please mention a valid member of this server");
    if (!member.kickable) return message.reply("I cannot kick this member!");
    var reason = msg.substr(msg.indexOf(member) + 2, msg.length)
    if (reason == null) {
      member.kick()
      message.reply(`Kicked ${member.username} out of the server.`)
    } else {
      member.kick(reason)
      message.reply(`Kicked ${member.username} out of the server for ${reason}`)
    }
  }
})
*/
client.login(process.env.BOT_TOKEN)
