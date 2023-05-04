/*
Roberto López (zelopdotnet@proton.net)
*/

const utils = require('./utils');
const express = require('express');
const app = express();
const port = 8000;

/* Assessment Note: 
    Recommendations: "Think some ways to use a database" 
    We are going to store the lists from mocky into variables.
    The proper way would've been having both mocky lists on a database
    and querying the DB requesting for the specific data we need.
*/

// Urls where the data is stored
const URLClients = "https://www.mocky.io/v2/5808862710000087232b75ac"
const URLPolicies = "https://www.mocky.io/v2/580891a4100000e8242b75c5"


async function main() {
    let CLIENTS, POLICIES;
    // We start by loading the data into vars.
    try {
        await Promise.all([
            utils.get_url(URLClients),
            utils.get_url(URLPolicies)
        ]).then((values) => {
            CLIENTS = JSON.parse(values[0])["clients"];
            POLICIES = JSON.parse(values[1])["policies"];
        });

    } catch (e) {
        console.error(e);
        console.log("There was an error accessing mocky information. Closing app..")
        return;
    }

// TODO Express GET functions //

// Filter by user_id
// requires roles: 'users', 'admin'

// Filter by username
// requires roles: 'users', 'admin'

// Get list policies
// requires roles: 'admin'

// Get user linked to policy
// requires roles: 'admin'

//We start the express server
    app.listen(port, () => {
        console.log(`Express listening on port ${port}.`)
    })

}

main();


