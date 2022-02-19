const { SlashCommandBuilder } = require('@discordjs/builders')

module.exports = {
	data: new SlashCommandBuilder()
		.setName('ping')
		.setDescription('Replies with message latency!'),
	async execute(interaction) {
    const timeTaken = Date.now() - interaction.createdTimestamp
    await interaction.reply(`Pong! This message had a latency of ${timeTaken}ms.`)
	},
}