
const commentController = require('../controllers/commentController');
const uploadCloud = require('../middlewares/uploader');
const router = require('express').Router()

router.post('/addComment', uploadCloud.single('image'), commentController.addComment)
router.post('/likeComment/:id', commentController.likeComment)
router.post('/cancelLikeComment/:id', commentController.cancelLikeComment)

router.get('/getByPost/:idPost/:limit', commentController.getByPost)
router.get('/getByParent/:idParent/:limit', commentController.getByParent)
router.get('/getCommentImage/:idComment', commentController.getCommentImage)

module.exports = router