const router = require('express').Router()
const loginRoute = require('./loginRoute')
const usersRoute = require('./usersRoute')
const inboxRoute = require('./inboxRoute')

router.use(loginRoute, usersRoute, inboxRoute)
module.exports = router
