module.exports = {
  name: 'bal',
  description: 'Check your balance',
  execute(message, args)
  {
    require('./balance').execute(message, args)
  }
}