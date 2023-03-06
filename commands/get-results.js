const { SlashCommandBuilder } = require('discord.js');
const { getEventId } = require("../api/getEventId");
const { getSets } = require("../api/getSets");

module.exports = {
	data: new SlashCommandBuilder()
		.setName('getresults')
		.setDescription('Retrieves top 64 results of a given tournament')
		.addStringOption(option =>
			option.setName('tournamentname')
				.setDescription('Name of tournament')
				.setRequired(true)
		)
		.addStringOption(option =>
			option.setName('eventname')
				.setDescription('Name of event')
				.setRequired(true)
		),
	async execute(interaction) {
		const tournamentName = interaction.options.getString('tournamentname');
		const eventName = interaction.options.getString('eventname');

		let id = await getEventId(tournamentName, eventName).then(response => {return response.event.id});

		let results = await getSets(id).then(response => {
			let res = response.event.standings.nodes;
			console.log(res)
			let resultsString = "";
			for(let i = 0; i < res.length; i++) {
				resultsString = resultsString + (res[i].placement).toString() + ". " + (res[i].entrant.name).toString() + "\n";
			}
			return resultsString;
		});
		await interaction.reply(results);
	},
};