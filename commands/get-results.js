const { SlashCommandBuilder } = require('discord.js');
const { getEventId } = require("../api/getEventId");
getEventId("bair-trap-23-air-jordan", "ultimate-singles");

module.exports = {
	data: new SlashCommandBuilder()
		.setName('getid')
		.setDescription('Replies with Pong!'),
	async execute(interaction) {
		await interaction.reply(getEventId("bair-trap-23-air-jordan", "ultimate-singles"));
	},
};