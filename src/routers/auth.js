const authController = require('../controllers/authController');
const verifyToken = require('../middlewares/verifyToken');

const router = require('express').Router();

router.post('/register', authController.register)
router.post('/login', authController.login)
router.post('/loginGoogle', authController.loginGoogle)
router.post('/refreshToken', authController.refreshToken)
router.post('/updateUser/:id', authController.updateUser)
router.post('/followingUser/:friend', authController.followingUser)
router.post('/accessFriend/:user', authController.accessFriend)
router.post('/unFollowingUser/:friend', authController.unFollowingUser)
router.post('/unFriend/:user', authController.unFriend)

router.get('/getAllUser', verifyToken, authController.getAllUser)
router.get('/getOne/:id', authController.getOneUser)
router.get('/find/:keyword', authController.findUser)

module.exports = router
