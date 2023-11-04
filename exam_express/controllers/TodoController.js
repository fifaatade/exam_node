const { json } = require('stream/consumers');
const TaskModel = require('../models/TaskModel')
var db =require('../config/database');
var authenticateToken= require('../middleware/auth')

const index = async (req, res) => {
    /* const userId = req.user._id;
    const taks = await db.collection('taskList').find({ user_id: userId }).toArray();
    res.send(taks); */
    const tasks = await TaskModel.find();
    res.status(200).json(tasks);

  };
  

/* const store = async (req, res) => {
  try {
    const task = req.body;

    if (!task ) {
      return res.status(400).json({ error: "Veuillez remplir le champs" });
    }
    const newTask = await TaskModel.create(task);

    await DB.collection("taskList").insertOne(newTask);
    console.log('tache ajouté avec succès');
    res.status(200).json({ message: 'tache ajouté' });
  } catch (error) {
    console.error("Erreur lors de l'ajout de la tache", error);
    res.status(500).json({ error: "Erreur lors de l'ajout de la tache" });
  }
} */
const store = async (req, res) => {
  const task = req.body;

  // Check the authorization header
  const token = req.headers['Authorization'];
  if (!token) {
    return res.status(401).json({ error: 'No token provided' });
  }

  // Save the task to the database
  const newTask = await TaskModel.create(task);

  // Respond with the newly created task
  res.status(201).json(newTask);
}

module.exports = {index,store}
