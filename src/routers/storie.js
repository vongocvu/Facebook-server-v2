const storieController = require('../controllers/storieController');
const verifyToken = require('../middlewares/verifyToken');
const uploadCloud = require('../middlewares/uploader');

const router = require('express').Router();

router.post('/addStorie', uploadCloud.single('image') , storieController.addStorie)
router.post('/updateStorie/:id', storieController.updateStorie)

router.get('/getStorie/:user', storieController.getStorie)
router.get('/getOneStorie/:id', storieController.getOneStorie)

module.exports = router
