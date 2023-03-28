const groupPublicController = require('../controllers/groupPublicController');
const verifyToken = require('../middlewares/verifyToken');

const router = require('express').Router();

router.post('/add', groupPublicController.addGroupPublic)
router.post('/updateTheme/:idGroup', groupPublicController.updateTheme)
router.post('/updateNickname/:idGroup', groupPublicController.updateNickname)

router.delete('/delete/:id', groupPublicController.deleteGroupPublic)

router.get('/get', groupPublicController.getGroupsPublic)
router.get('/getOne/:id', groupPublicController.getOneGroupPublic)
router.get('/getMyGroups/:user', groupPublicController.getMyGroupsPublic)


module.exports = router