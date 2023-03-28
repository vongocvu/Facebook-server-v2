const postDetailController = require('../controllers/postDetailController');
const verifyToken = require('../middlewares/verifyToken');
const uploadCloud = require('../middlewares/uploader');

const router = require('express').Router();

router.post('/addPostDetail', uploadCloud.single('image') , postDetailController.addPostDetail)

router.get('/getByPost/:idPost', postDetailController.getByPost)
router.get('/getOne/:idPostDetail', postDetailController.getOnePostDetail)

module.exports = router
