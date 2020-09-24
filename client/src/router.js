import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import EventCalendar from './views/EventCalendar.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/home',
      name: 'home',
      component: Home
    },
    {
      path: '/events',
      name: 'event-calendar',
      component: EventCalendar
    }
  ]
})
