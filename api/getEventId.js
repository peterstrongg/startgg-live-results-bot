const { startggApiKey } = require("../config.json");
// const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
const url = "https://api.start.gg/gql/alpha";

const query = `query EventQuery($slug:String) {event(slug: $slug) {id name}}`;

const getEventId = (tournamentName, eventName) => {
    const eventSlug = `tournament/${tournamentName}/event/${eventName}`;

    fetch(url, {
        method: "POST",
        headers: {
            "Content-Type" : "application/json",
            "Accept" : "application/json",
            Authorization: 'Bearer ' + startggApiKey
        },
        body: JSON.stringify({
            query,
            variables: {
                slug: eventSlug,
                tourneySlug: "bair-trap-23-air-jordan",
                eventSlug: "ultimate-singles",
                eventId: 78790,
                page: 1,
                perPage: 3
            }
        })
    }).then(response => {
        return response.json();
    }).then(data => {
        console.log(data.data.event.id);
    });
}

exports.getEventId = getEventId;
