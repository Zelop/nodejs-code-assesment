/*
Roberto López (zelopdotnet@proton.me)
*/

const express = require('express')
const router = express.Router()

const {
    getPoliciesByUsername,
    getUsersFromPolicyId,
} = require("../controllers/policies.js")

// Policy routes
router.get('/username/:username', getPoliciesByUsername)
router.get('/getuser/:id', getUsersFromPolicyId)

module.exports = router