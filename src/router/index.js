import Vue from 'vue'
import Router from 'vue-router'

import Search from '@/pages/search/Index.vue'
import SearchResults from '@/pages/search/Results.vue'
import About from '@/pages/About.vue'
import Privacy from '@/pages/Privacy.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
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
      meta: {gtm: '/search/-tag-'}
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
