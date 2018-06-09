<template>

<div class="container container-regular-page">
  <div class="row">
    <div class="col-md-6 offset-md-3 mt-5">
      <p>Signing out...</p>
    </div>
  </div>
</div>

</template>

<script>

import firebase from 'firebase'

export default {
  name: 'signout',
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
  mounted () {
    this.logout()
  },

}
</script>

<style scoped>

</style>
