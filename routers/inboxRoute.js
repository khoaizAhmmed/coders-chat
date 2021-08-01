const router = require('express').Router()
const decorateHtmlResponse = require('../middlewares/common/decorateHtmlResponse')
const InboxController = require('../controllers/InboxController')

router.get('/inbox', decorateHtmlResponse('Inbox'), InboxController.getInbox)

module.exports = router
