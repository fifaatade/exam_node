var express = require('express');
var router = express.Router();

const todoController = require('../controllers/TodoController');
var authenticateToken= require('../middleware/auth')

/* GET home page. */
router.get('/tasklist',todoController.index)
router.post('/sendtask',todoController.store);
router.post('/completedtask',todoController.updateStatus);
router.post('/addDate',todoController.updateDate);
router.get('/filter',todoController.filterTask);

module.exports = router;
