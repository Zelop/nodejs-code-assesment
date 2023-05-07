/*
Roberto López (zelopdotnet@proton.me)
*/

const utils = require('../utils');

// Return user with provided Id
const getUserById = ((req, res) => {
    res.json(utils.get_user_by_id(req.params.id, req.CLIENTS));
});

// Return user with provided username
const getUserByUsername = ((req, res) => {
    res.json(utils.get_user_by_name(req.params.username, req.CLIENTS));
});

module.exports = {
    getUserById,
    getUserByUsername
};