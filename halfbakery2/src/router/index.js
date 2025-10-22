import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '../views/HomePage.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomePage
  },
  {
    path: '/recent',
    name: 'Recent',
    component: HomePage // Temporary - will create proper views later
  },
  {
    path: '/add',
    name: 'AddIdea',
    component: () => import('../views/AddIdea.vue')
  },
  {
    path: '/search',
    name: 'Search',
    component: () => import('../views/Search.vue')
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/Login.vue')
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('../views/Register.vue')
  },
  {
    path: '/idea/:id',
    name: 'IdeaDetail',
    component: () => import('../views/IdeaDetail.vue')
  },
  {
    path: '/help',
    name: 'Help',
    component: () => import('../views/Help.vue')
  },
  {
    path: '/about',
    name: 'About',
    component: () => import('../views/About.vue')
  },
  {
    path: '/admin/flagged',
    name: 'AdminFlagged',
    component: () => import('../views/AdminFlagged.vue')
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router