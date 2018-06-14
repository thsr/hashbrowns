import Vue from 'vue'
import Router from 'vue-router'

import Search from '@/pages/search/Index.vue'
import SearchResults from '@/pages/search/Results.vue'

import Auth from '@/pages/auth/Auth.vue'
import Signin from '@/pages/auth/Signin.vue'
import Signup from '@/pages/auth/Signup.vue'
import Signout from '@/pages/auth/Signout.vue'
import ResetPassword from '@/pages/auth/ResetPassword.vue'

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
      name: 'Search',
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
      name: 'Auth',
      path: '/auth',
      redirect: '/auth/email'
    },
    {
      path: '/auth/:urlStep',
      component: Auth
    },
    {
      name: 'Signin',
      path: '/signin',
      component: Signin
    },
    {
      name: 'Signup',
      path: '/signup',
      component: Signup,
      beforeEnter: (to, from, next) => {
        if (localStorage.getItem("hb_signedinbefore")) next( { name: 'Signin' } )
        else next()
      }
    },
    {
      name: 'ResetPassword',
      path: '/resetpassword',
      component: ResetPassword
    },
    // {
    //   name: 'Signout',
    //   path: '/signout',
    //   component: Signout,
    //   meta: {requiresAuth: true}
    // },
    {
      name: 'Profile',
      path: '/profile',
      component: Profile,
      meta: {requiresAuth: true}
    },
    {
      name: 'About',
      path: '/about',
      component: About
    },
    {
      name: 'Privacy',
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
  else if ( requiresAuth && !currentUser && (numberSearches >= 3) ) next( { name: 'Signup' } )
  // else if (!requiresAuth && currentUser) next('/search')
  else next()
})

export default router