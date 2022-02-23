module.exports = {
  name: 'ping',
  description: `This command will return this message's latency`,
  async execute(message, args)
  {
    const timeTaken = Date.now() - message.createdTimestamp
    message.reply(`Pong! This message had a latency of ${timeTaken}ms.`)
  }
}