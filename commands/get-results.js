const { SlashCommandBuilder } = require('discord.js');
const { getEventId } = require("../api/getEventId");
const { getSets } = require("../api/getSets");

module.exports = {
	data: new SlashCommandBuilder()
		.setName('getresults')
		.setDescription('Returns results of a startgg bracket'),
	async execute(interaction) {
		let id = await getEventId("bair-trap-23-air-jordan", "ultimate-singles").then(response => {return response.event.id});
		let results = await getSets(id).then(response => {
			let res = response.event.standings.nodes;
			let resultsString = "";
			for(let i = 0; i < res.length; i++) {
				resultsString = resultsString + (res[i].entrant.name).toString() + "\n";
			}
			return resultsString;
		});
		await interaction.reply(results);
	},
};