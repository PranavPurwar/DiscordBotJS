const
{
  MessageEmbed,
  Interaction
} = require('discord.js')
const wallet = require('../wallet.json')
const bank = require('../bank.json')

module.exports = {
  name: 'balance',
  description: "Check your balance",
  execute(message, args)
  {
    let user
    if (message instanceof Interaction)
    {
      user = message.user
    }
    else
    {
      user = message.author
    }
    const author = user.id
    const embed = new MessageEmbed()
      .setColor('#0099ff')
      .setTitle(`${user.username}\'s balance`)
      .setThumbnail(user.avatarURL)
      .addFields(
      {
        name: 'Wallet',
        value: wallet[author]
      },
      {
        name: 'Bank',
        value: bank[author]
      })
      .setTimestamp()
    message.reply(
    {
      embeds: [embed]
    })
  }
}