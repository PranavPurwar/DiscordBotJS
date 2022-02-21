const http = require('http')
const fs = require('fs')
const
{
  Client,
  Collection
} = require('discord.js')

const prefix = '.'

const server = http.createServer(function (request, response)
{
  if (request.url == '/')
  {
    fs.readFile('test.html', function (err, data)
    {
      response.writeHead(200,
      {
        'Content-Type': 'text/html'
      })
      response.write(data)
      return response.end()
    })
  }
  else
  {
    response.end('Invalid data')
  }
})


const client = new Client(
{
  intents: ["GUILDS", "GUILD_MESSAGES"]
})

client.commands = new Collection()
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'))

const commands = []

client.once('ready', () =>
{
  console.log('Ready!');
  // Registering the commands in the client
  const guildId = '867985135931383809'
  const guild = client.guilds.cache.get(guildId)
  let coms

  if (guild)
  {
    coms = guild.commands
  }
  else
  {
    coms = client.application.commands
  }
  commandFiles.forEach(file =>
  {
    const command = require(`./commands/${file}`);
    commands.push(command.name)
    client.commands.set(command.name, command);
    coms.create(
    {
      name: command.name,
      description: command.description
    })
  })
});
client.on('interactionCreate', async(message) =>
{
  if (!message.isCommand())
  {
    return
  }

  const
  {
    commandName,
    args
  } = message
  client.commands.get(commandName).execute(message, args)
});

client.on("messageCreate", message =>
{
  msg = message.content
  if (!msg.startsWith(prefix) || message.author.bot) return
  const commandBody = msg.slice(prefix.length)
  const args = commandBody.split(' ')
  const command = args.shift().toLowerCase()
  if (commands.includes(command))
  {
    client.commands.get(command).execute(message, args)
  }
})
client.login(process.env.BOT_TOKEN);
server.listen(8080)