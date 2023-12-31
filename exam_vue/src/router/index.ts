import { createRouter, createWebHistory } from 'vue-router'
import TodoList from '@/views/TodoList.vue'
import Connexion from '@/views/Connexion.vue'
import Code from '@/views/Code.vue'
import Inscription from '@/views/Inscription.vue'
import { useUserStore } from '@/stores/users'
import Home from '@/views/Home.vue'
import { storeToRefs } from 'pinia'
import { useLocalStorage } from '@vueuse/core'
const login =useLocalStorage('login',{})

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component:Home
    },
    {
      path: '/connexion',
      name: 'connexion',
      component:Connexion,
    },
    {
      path: '/inscription',
      name: 'inscription',
      component:Inscription,
    },
    {
      path: '/code/:email',
      name: 'code',
      component:Code,
    },
    {
      path: '/todo',
      name: 'todo',
      component:TodoList,
      beforeEnter:(to, from, next) =>{
        if(login.value==true){
          next()
        }else{
          next('/connexion')
        }
      }
    },
  ]
})

export default router
