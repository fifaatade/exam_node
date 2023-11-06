const { json } = require('stream/consumers');
const TaskModel = require('../models/TaskModel')
var db =require('../config/database');
var authenticateToken= require('../middleware/auth')

const index = async (req, res) => {
    const tasks = await TaskModel.find({});
    res.status(200).json(tasks);

  };
  

const store = async (req, res) => {
  const taskData = new TaskModel({
    task: req.body.task,
    date: null,
    status: 0,
    user_id: req.body.user_id //"6543749239f25dae0677d6eb" 
  });

  // Save the task to the database
  const taskSave = await taskData.save()

  // Respond with the newly created task
  res.status(201).json(taskData);
}

const updateStatus =async(req,res) =>{
  const id = req.params.id;
  const taskData = await TaskModel.findOne({ id });

  // Vérifiez que la tâche existe
  if (!taskData) {
    return res.status(404).json({ message: 'La tâche n\'existe pas' });
  }

  // Modifiez le statut de la tâche
  taskData.status = req.body.status;

  // Enregistrez la tâche
  await TaskModel.updateOne({ id }, { status: taskData.status });
  return res.json({ task: taskData });
}



const updateDate = async (req, res) => {
  const id = req.params.id;
  const taskData = await TaskModel.findOne({ id });

  // Vérifiez que la tâche existe
  if (!taskData) {
    return res.status(404).json({ message: 'La tâche n\'existe pas' });
  }

  // Vérifiez que la date est valide
  const date = new Date(req.body.date);
  if (!date) {
    return res.status(400).json({ message: 'La date n\'est pas valide' });
  }

  // Modifiez la date de la tâche
  taskData.date = req.body.date;

  // Enregistrez la tâche
  await TaskModel.updateOne({ id }, { date: taskData.date });
  return res.json({ task: taskData });
};

const filterTask = async (req, res) => {
  // Obtenez la liste des tâches
  const tasks = await TaskModel.find({ status: true });

  // Retournez la liste des tâches filtrées
  res.json(tasks);
};


module.exports = {index,store,updateStatus,updateDate,filterTask}


