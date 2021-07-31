const router = require('express').Router()
const decorateHtmlResponse = require('../middlewares/common/decorateHtmlResponse')
const LoginController = require('../controllers/LoginController')

router.get('/', decorateHtmlResponse('Login'), LoginController.getLogin)

module.exports = router
