const { SlashCommandBuilder } = require('discord.js');
const { getEventId } = require("../api/getEventId");
const { getSets } = require("../api/getSets");

const getResults = () => { 
	getEventId("bair-trap-23-air-jordan", "ultimate-singles").then(response => {
		getSets(response.event.id).then(r => {
			return r.event.standings.nodes;
		});
	});
}

getResults();

module.exports = {
	data: new SlashCommandBuilder()
		.setName('getid')
		.setDescription('Replies with Pong!'),
	async execute(interaction) {
		let id = await getEventId("bair-trap-23-air-jordan", "ultimate-singles").then(response => {return response.event.id});
		let results = await getSets(id).then(response => {
			let res = response.event.standings.nodes;
			let resultsString = "";
			for(let i = 0; i < res.length; i++) {
				resultsString.concat((res[i].entrant.name).toString());
			}
			console.log(resultsString);
			return response.event.standings.nodes[0].entrant.name;
		});
		await interaction.reply(results);
	},
};