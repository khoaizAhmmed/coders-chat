const router = require('express').Router()

const decorateHtmlResponse = require('../middlewares/common/decorateHtmlResponse')
const UsersController = require('../controllers/UsersController')
const avatarUpload = require('../middlewares/users/avatarUpload')
const { addUserValidators, addUserValidationHandler } = require('../middlewares/users/usersValidators')
const { checkLogin } = require('../middlewares/common/checkLogin')

router.get('/users', decorateHtmlResponse('Users'), checkLogin, UsersController.getUsers)
router.post('/users', checkLogin, avatarUpload, addUserValidators, addUserValidationHandler, UsersController.addUser)
router.delete('/users/:id', UsersController.removeUser)
module.exports = router
