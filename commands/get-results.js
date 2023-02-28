const { startggApiKey } = require("../config.json");
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
const url = "https://api.start.gg/gql/alpha";
