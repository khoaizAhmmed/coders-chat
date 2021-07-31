const router = require('express').Router()
const loginRoute = require('./loginRoute')

router.use(loginRoute)
module.exports = router
