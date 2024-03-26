import { createRouter, createWebHistory } from 'vue-router'
import store from '../store'
import HomeView from '../views/HomeView.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomeView,
    meta :{
      layout: 'main',
      auth:true
    }
  },
  {
    path: '/help',
    name: 'Help',
    component: () => import('../views/HelpView.vue'), 
    meta: {
      layout: 'main',
      auth:true
    }
  },
  {
    path: '/request/:id',
    name: 'Request',
    component: () => import('../views/RequestView.vue'), 
    meta: {
      layout: 'main',
      auth:true
    }
  },
  
  {
    path: '/auth',
    name: 'Auth',
    component: () => import('../views/AuthView.vue'),
    meta :{
      layout: 'auth'
    }
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  linkActiveClass: 'active',
  linkExactActiveClass: 'active'
})

router.beforeEach((to,from,next) => {
  const requireAuth = to.meta.auth

  if(requireAuth && store.getters['auth/isAuthenticated']){
    next()
  }
  else if (requireAuth && !store.getters['auth/isAuthenticated']){
    next('/auth?message=auth')
  }
  else {
    next()
  }
})

export default router
