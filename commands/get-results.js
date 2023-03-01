const { SlashCommandBuilder } = require('discord.js');
const { getEventId } = require("../api/getEventId");

module.exports = {
	data: new SlashCommandBuilder()
		.setName('getid')
		.setDescription('Replies with Pong!'),
	async execute(interaction) {
		let id = await getEventId("bair-trap-23-air-jordan", "ultimate-singles").then(response => {return response.event.id});
		await interaction.reply(id.toString());
	},
};