const router = require('express').Router()

const groupController = require('../controllers/groupController')

router.get('/getMyGroups/:user', groupController.getMyGroups)

module.exports = router