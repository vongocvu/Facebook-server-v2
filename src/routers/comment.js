const router = require('express').Router()

const CommentController = require('../controllers/CommentController');


router.post('/addComment', CommentController.addComment)

router.get('/getByPost/:idPost', CommentController.getByPost)
router.get('/getByParent/:idParent', CommentController.getByParent)

module.exports = router