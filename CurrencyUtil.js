import fs from 'fs'

module.exports = {
  async updateWallet(wallet)
  {
    fs.writeFile('./wallet.json', JSON.stringify(wallet), err =>
    {
      if (err) throw err
    })
  },

  async updateBank(bank)
  {
    fs.writeFile('./bank.json', JSON.stringify(bank), err =>
    {
      if (err) throw err
    })
  }
}