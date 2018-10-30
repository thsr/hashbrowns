<!--==============================
=            template            =
===============================-->

<template>

<nav class="navbar navbar-expand-lg navbar-light" style="background: transparent;">
    <router-link :to="{ path: '/' }" class="navbar-brand"><span class="logo1">Tag Chicken</span></router-link>
    <button class="navbar-toggler border-0" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse justify-content-md-end" id="navbarNav">
        <ul class="navbar-nav">
            <li class="nav-item">
                <router-link :to="{ name: 'Search' }" class="nav-link">Search</router-link>
            </li>
            <li class="nav-item">
                <router-link :to="{ name: 'About' }" class="nav-link">About</router-link>
            </li>
            <li v-if="!user" class="nav-item">
                <router-link :to="{ name: 'Signup' }" class="nav-link">Join or Sign In</router-link>
            </li>
            <li v-if="user" class="nav-item">
                <router-link :to="{ name: 'Profile' }" class="nav-link">Profile</router-link>
            </li>
            <li v-if="user" class="nav-item">
                <a href="javascript:;" @click="logout" class="nav-link">Sign Out</a>
            </li>
        </ul>

    </div>
</nav>

</template>


<!--============================
=            script            =
=============================-->

<script>

import firebase from 'firebase/app'

export default {
  name: 'main-header',
  data: function () {
    return {
      user: null
    }
  },

  mounted () {
    firebase.auth().onAuthStateChanged( (user) => {
      if (user) {
        this.user = user
        dataLayer.push({
          event: 'auth_changed',
          email: user.email,
          user_id: user.uid
        })
      } else {
        this.user = null
      }
    })
  },

  methods: {
    logout: function() {
      this.$Progress.start()
      firebase.auth().signOut().then(() => {
        this.$router.push('/search')
      })
      dataLayer.push({
        event: 'sign_out'
      })
      this.$Progress.finish()
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
