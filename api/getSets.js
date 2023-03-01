const { startggApiKey } = require("../config.json");
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
const url = "https://api.start.gg/gql/alpha";

const query = `
query EventStandings($eventId: ID!, $page: Int!, $perPage: Int!) {
  event(id: $eventId) {
    id
    name
    standings(query: {
      perPage: $perPage,
      page: $page
    }){
      nodes {
        placement
        entrant {
          id
          name
        }
      }
    }
  }
}
`

const getSets = (eventId) => {
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
                        eventId,
                        page: 1,
                        perPage: 64
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

exports.getSets = getSets