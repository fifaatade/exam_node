<template>
    <div :class="mode==='sun'? 'darkmode':''"> <!--class:darkmode-->
        <div class="session-connect">
            <p >WELCOME</p>
            <button @click="signOut" >Sign Out🔒 </button>
        </div>
        <header>
            <div class="container">
                <div class="header-content">
                    <h1 :class="mode==='dark'? 'color-title':''">T O D O - L I S T</h1> <!-- class:color-title -->
                    <div>
                        <Sun @click="mode ='dark'" v-if="mode==='sun'"/>
                        <Moon @click="mode = 'sun'" v-else-if="mode==='dark'"/>
                    </div>
                </div>
            </div>
            <img v-if="mode==='dark'" src="@/assets/day.jpeg" alt="image" />
            <img v-else-if="mode==='sun'" src="@/assets/cat7.jpeg" alt="image"/>
        </header>
        <main>
            <section class="toDoList">
                <div class="container">
                    <div class="toDoList-content">
                       <form class="to-do-list" @submit.prevent="addListTask">
                            <div class="input">
                                <input type="text" v-model="taskData.task" class="list"  placeholder="create a new task"/>
                            </div> 
                            <button type="submit" >Add</button>
                        </form> 
                        
                        <div class="ListTask" v-for="(element,index) in taskList"  :key="index">
                            <p :class="element.status? 'color':''" >{{ element.task}}</p>
                            <input type="checkbox"  :checked="element.status!=element.status" @input="updateStatus(element)"  v-model="element.status">
                            <div class="line"><input class="date" v-model="element.date" type="date"><Save title="save" @click="updateDate(element)"></Save></div>
                            <Trash @click="deleteTask(element)"></Trash> 
                        </div> 
                        
                    </div>
                </div>
            </section>
            <div class="filter">
                <p class="green" @click="filterTask()"><star/>show completed tasks</p>
                <p class="red" @click="initialiseListTask"><star class="red"/>show all</p>
            </div>
        </main>
        <footer>
            <p>@ Better manage your to-do lists</p>
        </footer>
    </div>
</template>

<script lang="ts" setup>

import Trash from "@/components/icons/Trash.vue"
import Moon from '@/components/icons/Moon.vue'
import Save from '@/components/icons/Save.vue'
import Sun from '@/components/icons/Sun.vue'
import Star from '@/components/icons/Star.vue'
import { useLocalStorage } from "@vueuse/core"
import { useListTaskStore } from "@/stores/listTask";
import {useUserStore} from '@/stores/users'
import { onMounted, ref ,computed} from 'vue';
import { storeToRefs } from 'pinia';
import http from '@/lib/http';
import { useToast } from 'vue-toast-notification';
import clientHttp from '@/lib/clientHttp';
const mode =useLocalStorage('mode',{})
mode.value='dark'

const $toast = useToast()

//const {taskData,addListTask,taskList,initialiseListTask,updateDate,updateStatus,deleteTask,filterTask}= useListTaskStore() 

const { signOut } = useUserStore()
onMounted(() => {
    signOut
})
         


import { defineStore } from "pinia";
import {useAxios} from "@/composable/useAxios"
import router from '@/router';
import { required, email, sameAs } from "@vuelidate/validators";
import useVuelidate from "@vuelidate/core";
import axios from 'axios'



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
const statusData = ref(true)

const updateStatus = async () => {
  try {
    await http.post(`/todo/completedtask`, {
      status: statusData.value
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

  function deleteTask(element){
    /* console.log(element) */
    const index= taskList.value.findIndex((item)=>item.task==element.task)
    if(index!==-1)
    taskList.value.splice(index,1)
}
 

</script>

<style scoped>
.darkmode{
    background-color: rgb(20, 17, 20);
    width: 100%;
    min-height: 100vh;
}
header{
    width: 100%;
}
.header-content{
    position: absolute;
    z-index: 1;
    display: flex;
    align-items: center;
    justify-content: space-around;
    width: 100%;
}
h1{
    padding: 30px 0 0 20px;
    font-size: 50px;
}
header img{
    width: 100%;
    max-height: 500px;
    object-fit: cover;
    filter: invert(30%);
}

.session-connect{
    width: 100%;
    background-color: rgba(94, 88, 88, 0.336);
    display: flex;
    justify-content: flex-end;
} .session-connect p{
    font-size: 30px;
    color: transparent;
    background-image: linear-gradient(rgba(105, 199, 68, 0.507) , rgba(10, 22, 5, 0.418));
    -webkit-text-stroke: .7px black;
    background-repeat: no-repeat;
    -webkit-background-clip: text;
    animation: userConnect 5s linear infinite;
    animation-delay: 1s;
    padding-right: 10px;
} 
.session-connect button{
    border: none;
    background-color: transparent;
    font-size: 18px;
    color: rgb(43, 7, 7);
    border-left: 2px solid grey;
    padding: 0 10px;
    cursor: pointer;
}
.session-connect button:hover{
    text-decoration: underline;
    color: rgb(2, 34, 34);
}
.color-title{
    color: rgb(12, 37, 2);
}
.filter{
    padding-top: 20px;
    display: flex;
    gap: 10px;
    justify-content: center;
}
.filter p{
    display: flex;
    align-items: center;
    gap: 5px;
    cursor: pointer;
}
.green{
    color: green;
}
.filter p:hover{
    text-decoration: underline;
    color: grey;
}
.toDoList-content{
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
}
.to-do-list{
    width: 60%;
    display: flex;
    gap: 10px;
    margin-bottom: 30px;
}
.input{
    height: 45px;
    width: 100%;
}
.input input{
    height: 100%;
    width: 100%;
    padding-left: 15px;
    border-radius: 5px;
    border: 1px solid grey;
    background-color: transparent;
    color: grey;
}
.white{
    color: white;
}
input:focus, button:focus{
    outline: none;
}
.line{
    display: flex;
    gap: 5px;
    justify-content: center;
}
.to-do-list button{
    border: none;
    padding: 10px 15px;
    background-color: grey;
    color: white;
    cursor: pointer;
}
.ListTask{
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 50%;
    border: 1px solid grey;
    height: 45px;
    font-size: 18px;
    color: rgb(129, 136, 125);
    font-weight: bold;
    padding: 8px;
}
.red{
    color: red;
}
.color{
    color: rgb(3, 51, 3);
    font-size: 20px;
}
.date{
    border: none;
    outline: none;
    color: grey;
}
footer {
    display: flex;
    justify-content: center;
    position: fixed;
    width: 100%;
    bottom: 5px;
    left: 0;
    z-index: 1;
}
footer p{
    color: grey;
}


@keyframes userConnect{
    0%,
    10%,
    100%{
        background-position: -35rem 0;
    }
    65%,
    85%{
        background-position: 0 0;
    }
}
</style>