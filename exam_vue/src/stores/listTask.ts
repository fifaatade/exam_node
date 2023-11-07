import { defineStore } from "pinia";
import { computed, ref, onMounted } from 'vue'
import http from "@/lib/http"
import {useAxios} from "@/composable/useAxios"
import  clientHttp  from "@/lib/clientHttp";
import router from '@/router';
import { required, email, sameAs } from "@vuelidate/validators";
import useVuelidate from "@vuelidate/core";
import axios from 'axios'
import { useToast } from 'vue-toast-notification';

export const useListTaskStore = defineStore("listTask",()=>{

  const $toast = useToast();
/*   const userId = ref();

async function getUserId() {
  const response = await http.get('/authentification/user');
  return response.data;
}

function mounted() {
  userId.value = await getUserId();
}
 */
const taskData = ref({
  task: '',
});



  const taskDataRequired = computed(() => {
      return {
          task: {
              required
          }
      }
  })

  const vueTaskData = useVuelidate(taskDataRequired, taskData)


  const addListTask = async () => {

      const vueTaskDataValid = await vueTaskData.value.$validate()

      console.log(vueTaskDataValid);

      if (vueTaskDataValid) {

          http.post('/todo/sendtask',taskData.value)
              .then((response) => {
                  $toast.success('tache ajoutée avec succès !')
              })
              .catch(error => {
                  $toast.error(error.message)
              })

      } else {

          $toast.error("Echec ! Echec de l'ajout")
      }
  }

    // Initialize the list of tasks
    const taskList = ref([])

    // Function to fetch tasks from the API
    const initialiseListTask = async () => {
      try {
        const response = await http.get('/todo/tasklist');
        taskList.value = response.data;
        console.log(taskList)
      } catch (error) {
        $toast.error(error.message);
      }
    };
const task = ref({})
// Function to update the date of a task
const updateDate = async () => {
  try {
    await http.post(`/todo/addDate`, {
      date: taskList.date,
    });
    $toast.success('Date de la tâche mise à jour avec succès!');
  } catch (error) {
    $toast.error(error.message);
  }
};

// Function to update the status of a task
const updateStatus = async () => {
  try {
    await http.post(`/todo/completedtask`, {
      status: !taskList.status,
    });
    $toast.success('Statut de la tâche mis à jour avec succès!');
  } catch (error) {
    $toast.error(error.message);
  }
};

  const filterTask = async () => {
    try {
      const response = await http.get(`/todo/filter`);
      taskList.value = response.data;
    } catch (error) {
      $toast.error(error.message);
    }
  };
  
// Function to delete a task
const deleteTask = async () => {
  try {
    await http.post(`/todo/delete`);
    $toast.success('Tâche supprimée avec succès!');
    // Remove the task from the local task list
    taskList.value = taskList.value.filter((item) => item.id !== task.id);
  } catch (error) {
    $toast.error(error.message);
  }
};

  return {taskData,addListTask,taskList,initialiseListTask,updateDate,updateStatus,deleteTask,filterTask}

})
