const router = require('express').Router()
const postController = require('../controllers/postController')


router.post('/addPost', postController.addPost)

router.get('/getPosts/:idUser/:limit', postController.getPosts)
router.get('/getMyPosts/:idUser', postController.getMyPosts)

module.exports = router