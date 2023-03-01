const { startggApiKey } = require("../config.json");
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
const url = "https://api.start.gg/gql/alpha";

const query = `
query EventSets($eventId: ID!, $page: Int!, $perPage: Int!) {
    event(id: $eventId) {
      id
      name
      sets(
        page: $page
        perPage: $perPage
        sortType: STANDARD
      ) {
        pageInfo {
          total
        }
        nodes {
          id
          slots {
            id
            entrant {
              id
              name
            }
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
                        perPage: 100
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
getSets(868290).then(response => console.log(response.event.sets.nodes[30].slots[1]))

exports.getSets = getSets