var express = require('express');
var router = express.Router();

const authenticationController = require('../controllers/AuthentificationController')

/* GET home page. */
router.post('/signup', authenticationController.registration)
router.post('/signin', authenticationController.connection)
router.post('/validate', authenticationController.validate)

module.exports = router;
