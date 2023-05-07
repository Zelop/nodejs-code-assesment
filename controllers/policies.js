/*
Roberto López (zelopdotnet@proton.me)
*/

const utils = require('../utils');
    
// Get list policies linked to user
const getPoliciesByUsername = ((req, res) => {
    res.json(utils.get_policies_from_user(req.params.username, req.POLICIES, req.CLIENTS));
});

// Get user linked to policy
const getUsersFromPolicyId = ((req, res) => {
    res.json(utils.get_user_from_policy(req.params.id, req.POLICIES, req.CLIENTS)); 
});

module.exports = {
    getPoliciesByUsername,
    getUsersFromPolicyId
};