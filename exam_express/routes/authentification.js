var express = require('express');
var router = express.Router();
var authenticateToken= require('../middleware/auth')
 
const authenticationController = require('../controllers/AuthentificationController')

/* GET home page. */
router.post('/signup', authenticationController.registration)
router.post('/signin', authenticationController.connection)
router.post('/validate', authenticationController.validate)
router.get('/user',authenticateToken, authenticationController.userData)


module.exports = router;
