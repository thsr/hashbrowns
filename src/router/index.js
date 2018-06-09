import Vue from 'vue'
import Router from 'vue-router'

import Search from '@/pages/search/Index.vue'
import SearchResults from '@/pages/search/Results.vue'
import Auth from '@/pages/Auth.vue'
import Signout from '@/pages/Signout.vue'
import Profile from '@/pages/Profile.vue'
import About from '@/pages/About.vue'
import Privacy from '@/pages/Privacy.vue'


import firebase from 'firebase'

Vue.use(Router)

let router = new Router({
  mode: 'history',
  linkActiveClass: 'active',
  routes: [
    {
      path: '/',
      redirect: '/search'
    },
    {
      path: '/search',
      component: Search
    },
    {
      path: '/search/:tag',
      name: 'SearchResults', // this one has the loading bar disabled based on route name in App.vue
      component: SearchResults,
      meta: {requiresAuth: true, gtm: '/search/-tag-'}
    },
    {
      path: '/auth',
      component: Auth
    },
    {
      path: '/profile',
      component: Profile,
      meta: {requiresAuth: true}
    },
    {
      path: '/signout',
      component: Signout,
      meta: {requiresAuth: true}
    },
    {
      path: '/about',
      component: About
    },
    {
      path: '/privacy',
      component: Privacy
    },
    {
      path: '*',
      redirect: '/search'
    }
  ]
})

router.beforeEach((to, from, next) => {
  let currentUser = firebase.auth().currentUser
  let requiresAuth = to.matched.some(record => record.meta.requiresAuth)
  let numberSearches = parseInt(localStorage.getItem("hb_maincomponent"))

  if ( requiresAuth && !currentUser && (numberSearches < 3) ) next()
  else if ( requiresAuth && !currentUser && (numberSearches >= 3) ) next('/auth')
  // else if (!requiresAuth && currentUser) next('/search')
  else next()
})

export default router