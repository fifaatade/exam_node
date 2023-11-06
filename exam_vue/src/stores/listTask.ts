import { defineStore } from "pinia";
import { computed, ref } from 'vue'
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

  const connectId = localStorage.getItem('tokenUser')
  ////////////envoie des taches     
  const taskData = ref({
      task: '',
      user_id: connectId
  })

  const taskDataRequired = computed(() => {
      return {
          task: {
              required
          },
          user_id: {
              required
          }
      }
  })

  const vueTaskData = useVuelidate(taskDataRequired, taskData)


  const addListTask = async () => {

      const vueTaskDataValid = await vueTaskData.value.$validate()

      console.log(vueTaskDataValid);

      if (vueTaskDataValid) {

          http.post('/todo/sendtask', taskData.value)
              .then((response) => {
                  $toast.success('tache ajoutée avec succès !',)
              })
              .catch(error => {
                  $toast.error(error.message)
              })

      } else {

          $toast.error("Echec ! Echec de l'ajout")
      }
  }

    // Initialize the list of tasks
    const taskList = ref({});

    // Function to fetch tasks from the API
    const initialiseListTask = async () => {
      try {
        const response = await http.get(`/todo/tasklist`);
        taskList.value = response.data;
      } catch (error) {
        $toast.error(error.message);
      }
    };


  return {taskData,addListTask,taskList,initialiseListTask}

})
