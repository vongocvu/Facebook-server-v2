
const commentController = require('../controllers/commentController');
const router = require('express').Router()


router.post('/addComment', commentController.addComment)

router.get('/getByPost/:idPost', commentController.getByPost)
router.get('/getByParent/:idParent', commentController.getByParent)

module.exports = router