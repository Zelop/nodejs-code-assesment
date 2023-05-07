/*
Roberto López (zelopdotnet@proton.me)
*/

const express = require('express');
const router = express.Router();

const {
    getUserById,
    getUserByUsername,
} = require("../controllers/users.js");

// User routes
router.get('/id/:id', getUserById);
router.get('/name/:username', getUserByUsername);

module.exports = router;