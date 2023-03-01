const { startggApiKey } = require("../config.json");
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
const url = "https://api.start.gg/gql/alpha";

const query = `query EventQuery($slug:String) {event(slug: $slug) {id name}}`;

const getEventId = (tournamentName, eventName) => {
    const eventSlug = `tournament/${tournamentName}/event/${eventName}`;

    return new Promise((resolve, reject) => {
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
                }
            })
        }).then(response => {
            return response.json();
        }).then(data => {
            resolve(data.data);
        }, error => {
            reject(error);
        })
    });
}

exports.getEventId = getEventId;
