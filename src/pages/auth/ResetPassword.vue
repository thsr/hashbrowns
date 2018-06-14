<template>

<div class="container container-full-page">
    <div class="row align-items-center justify-content-center">




        <div class="col-md-6 text-center">
          <h2 class="lead mb-3">
            <strong>Reset your password.</strong><br>
            You will receive an email with a&nbsp;reset&nbsp;link.
          </h2>
          <form class="form" @submit.prevent="resetPassword">
            <div class="form-group">
              <input type="email" class="form-control" id="email" placeholder="Email address" required autofocus
                ref="email"
                v-model="email">
            </div>
            <button type="submit" class="btn btn-primary">Reset your password</button>
          </form>
        </div>

    </div>
</div>


</template>

<script>
import firebase from 'firebase'

export default {
  name: 'resetpassword',
  data: function() {
    return {
      email: '',
    }
  },
  methods: {
    resetPassword: async function() {
      try {
        const sendResetEmail = await firebase.auth().sendPasswordResetEmail(this.email)
        alert("Email sent. Use the link in your email to reset your password.")
        this.$router.push( { name: 'Signin' })
      } catch(err) {
        alert(err.message)
      }
    },
  }
}
</script>

<style scoped lang="sass">

.fade-slide-y-auth-enter-active, .fade-slide-y-auth-leave-active
  transition: all .2s

.fade-slide-y-auth-enter, .fade-slide-y-auth-leave-to
  opacity: 0
  transform: translateY(10px)

h2.lead
  line-height: 1.8
  font-weight: 400

input
  font-size: 1.15rem
  text-align: center

</style>