const
{
  Interaction
} = require('discord.js')
const wallet = require('../wallet.json')
const bank = require('../bank.json')

module.exports = {

  name: "create-account",
  description: 'Register your presence in our database',

  async execute(message, args)
  {

    let author

    const instance = message instanceof Interaction
    if (instance)
    {
      author = message.user.id
    }
    else
    {
      author = message.author.id
    }

    if (author in wallet)
    {
      if (instance)
      {
        message.reply(
        {
          content: 'Hey dumb, You\'ve already registered your account',
          ephemeral: true
        })
      }
      else
      {
        message.reply(`Hey dumb, You've already registered your account.`)
      }
      return
    }

    wallet[author] = '5000'
    bank[author] = '5000'

    require('../CurrencyUtil').updateWallet(wallet)
    require('../CurrencyUtil').updateBank(bank)

    message.reply('Your account has been registered 😃')
  }
}