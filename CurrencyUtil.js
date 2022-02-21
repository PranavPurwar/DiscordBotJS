import fs from 'fs'

module.exports = {
  updateWallet(wallet)
  {
    fs.writeFile('./wallet.json', JSON.stringify(wallet), err =>
    {
      if (err) throw err
    })
  },

  updateBank(bank)
  {
    fs.writeFile('./bank.json', JSON.stringify(bank), err =>
    {
      if (err) throw err
    })
  }
}