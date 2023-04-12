const messageController = require('../controllers/messageController')
const verifyToken = require('../middlewares/verifyToken');
const uploadCloud = require('../middlewares/uploader');
const router = require('express').Router()


router.post('/add', uploadCloud.single('imageMessage') , messageController.addMessage)
router.post('/sendMessage/:id', messageController.sendMessage)
router.post('/likeMessage/:id', messageController.likeMessage)
router.post('/cancelLikeMessage/:id', messageController.cancelLikeMessage)

router.get('/getByGroup/:group/:limit', messageController.getMessageByGroup)
router.get('/getMessageImage/:idMessage', messageController.getMessageImage)

module.exports = router