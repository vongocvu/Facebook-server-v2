const groupPrivateController = require('../controllers/groupPrivateController');
const verifyToken = require('../middlewares/verifyToken');

const router = require('express').Router();

router.post('/add', groupPrivateController.addGroupPrivate)
router.post('/updateTheme/:idGroup', groupPrivateController.updateTheme)
router.post('/updateNickname/:idGroup', groupPrivateController.updateNickname)

router.delete('/delete/:id', groupPrivateController.deleteGroupPrivate)

router.get('/get', groupPrivateController.getGroupsPrivate)
router.get('/getOne/:id', groupPrivateController.getOneGroupPrivate)
router.get('/getMyGroups/:user', groupPrivateController.getMyGroupsPrivate)
router.get('/getMyGroup/:user/:friend', groupPrivateController.getMyGroupPrivate)


module.exports = router