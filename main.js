/*
Roberto López (zelopdotnet@proton.me)
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

    // requires roles: 'users', 'admin'
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

    // We now declare the express functions
    // Get by user_id
    app.get('/user/id/:id', (req, res) => {
        res.json(utils.get_user_by_id(req.params.id, CLIENTS));
    });

    // Get by username
    app.get('/user/name/:username', (req, res) => {
        res.json(utils.get_user_by_name(req.params.username, CLIENTS));
    });

    
    // Admin is required for the other GETs
    // requires roles: 'admin'
    app.use(function(req, res, next) {  
        auth = req.headers.authorization.split(' ')[1];
            if (utils.get_user_role(auth, CLIENTS) != "admin") {
                return res.status(403).json();
            }
        next();
      });


    // Get list policies linked to user
    app.get('/policies/username/:username', (req, res) => {
        res.json(utils.get_policies_from_user(req.params.username, POLICIES, CLIENTS));
    });

    // Get user linked to policy
    app.get('/policies/getuser/:id', (req, res) => {
        res.json(utils.get_user_from_policy(req.params.id, POLICIES, CLIENTS));
    });

    // We start the express server
    app.listen(port, () => {
        console.log(`Express listening on port ${port}.`)
    })

}

main();


