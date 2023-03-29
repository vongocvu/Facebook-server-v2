const messageController = require('../controllers/messageController')
const verifyToken = require('../middlewares/verifyToken');

const router = require('express').Router()


router.post('/add', messageController.addMessage)

router.get('/getByGroup/:group/:limit', messageController.getMessageByGroup)
router.post('/sendMessage/:id', messageController.sendMessage)

module.exports = router