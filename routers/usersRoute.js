const router = require('express').Router()

const decorateHtmlResponse = require('../middlewares/common/decorateHtmlResponse')
const UsersController = require('../controllers/UsersController')
const avatarUpload = require('../middlewares/users/avatarUpload')

router.get('/users', decorateHtmlResponse('Users'), UsersController.getUsers)
router.post('/users', avatarUpload)

module.exports = router
