/*
Roberto López (zelopdotnet@proton.me)
*/

const utils = require('./utils');
const express = require('express');
const app = express();
const port = 8000;

// Import routes
const users_routes = require('./routes/users.js');
const policies_routes = require('./routes/policies.js')

/* Assessment Note: 
    Recommendations: "Think some ways to use a database" 
    We are going to store the lists from mocky into variables.
    The proper way would've been having both mocky lists on a database
    and querying the DB requesting for the specific data we need.
    I am unsure if by "thinking some ways" I am supposed to in fact implement one 
    and store the data from the urls on it. 
*/

// Urls where the data is stored
const URLClients = "https://www.mocky.io/v2/5808862710000087232b75ac"
const URLPolicies = "https://www.mocky.io/v2/580891a4100000e8242b75c5"

// Authlevels
const user_required = ["user", "admin"]


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

    // We proceed by setting up "authentication"

    app.use(function(req, res, next) {
        if (!req.headers.authorization) {
          return res.status(403).json({ error: 'Missing credentials' });
        } else {   
        auth = req.headers.authorization.split(' ')[1];
            if (!(user_required.includes(utils.get_user_role(auth, CLIENTS)))) {
                return res.status(403).json();
            }
        }
        next();
    });

    // As we lack a DB we will just send the CLIENT data embedded in the request. 
    app.use('/user', function(req, res, next) {
        req.CLIENTS = CLIENTS;
        next();
    }, users_routes);

    // Admin is required for the other routes
    app.use(function(req, res, next) {  
        auth = req.headers.authorization.split(' ')[1];
            if (utils.get_user_role(auth, CLIENTS) != "admin") {
                return res.status(403).json();
            }
        next();
    });

    // As we lack a DB we will just send the CLIENT and POLICIES data embedded in the request. 
    app.use('/policies', function(req, res, next) {
        req.CLIENTS = CLIENTS;
        req.POLICIES = POLICIES;
        next();
    }, policies_routes);

    // We start the express server
    if (process.env.NODE_ENV !== 'test') {
        const server = app.listen(port, () => {
            console.log(`Express listening on port ${port}.`)
        }) 
    }
    return app

}

main();

module.exports = main;