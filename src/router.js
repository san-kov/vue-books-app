import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Books from './views/Books.vue'
Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/books',
      name: 'books',
      component: Books
    }
  ]
})
