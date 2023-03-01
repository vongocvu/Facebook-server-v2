const authController = require('../controllers/authController');

const router = require('express').Router();

router.get('/login', authController.login)

module.exports = router