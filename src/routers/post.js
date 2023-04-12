const router = require('express').Router()
const postController = require('../controllers/postController')


router.post('/addPost', postController.addPost)
router.post('/likePost/:id', postController.likePost)
router.post('/cancelLikePost/:id', postController.cancelLikePost)

router.get('/getPosts/:idUser/:limit', postController.getPosts)
router.get('/getMyPosts/:idUser/:limit', postController.getMyPosts)

module.exports = router