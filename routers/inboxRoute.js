const router = require('express').Router()
const decorateHtmlResponse = require('../middlewares/common/decorateHtmlResponse')
const InboxController = require('../controllers/InboxController')
const { checkLogin } = require('../middlewares/common/checkLogin')

router.get('/inbox', decorateHtmlResponse('Inbox'), checkLogin, InboxController.getInbox)

module.exports = router
