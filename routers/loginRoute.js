const router = require('express').Router()

const decorateHtmlResponse = require('../middlewares/common/decorateHtmlResponse')
const LoginController = require('../controllers/LoginController')
const { loginValidators, loginValidationHandler } = require('../middlewares/login/loginValidators')
const { redirectLoggedIn } = require('../middlewares/common/checkLogin')

router.get('/', decorateHtmlResponse('Login'), redirectLoggedIn, LoginController.getLogin)
router.post('/', decorateHtmlResponse('Login'), loginValidators, loginValidationHandler, LoginController.login)
router.delete('/', LoginController.logout)

module.exports = router
