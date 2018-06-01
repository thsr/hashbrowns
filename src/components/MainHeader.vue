<!--==============================
=            template            =
===============================-->

<template>

<nav class="navbar navbar-expand-lg navbar-light" style="background: transparent;">
    <router-link :to="{ path: '/' }" class="navbar-brand" href="javascript:;"><span class="logo1">hashbrowns</span><span class="logo2">.cc</span></router-link>
    <button class="navbar-toggler border-0" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse justify-content-md-end" id="navbarNav">
        <ul class="navbar-nav">
            <li class="nav-item">
                <router-link :to="{ path: '/search' }" class="nav-link" href="javascript:;">Search</router-link>
            </li>
            <li class="nav-item">
                <router-link :to="{ path: '/about' }" class="nav-link" href="javascript:;">About</router-link>
            </li>
            <li class="nav-item">
                <router-link :to="{ path: '/profile' }" class="nav-link" href="javascript:;">Profile</router-link>
            </li>
        </ul>
    </div>
</nav>

</template>


<!--============================
=            script            =
=============================-->

<script>

import firebase from 'firebase'

export default {
  name: 'main-header',
  data: function () {
    return {}
  },
  methods: {
    logout: function() {
      firebase.auth().signOut().then(() => {
        this.$router.push('/search')
      })
    }
  },
  computed: {
    abc: function() {
      return firebase.auth().currentUser
    }
  },
}
</script>


<!--===========================
=            style            =
============================-->

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="sass">


</style>
