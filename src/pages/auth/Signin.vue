<template>

<div class="container container-full-page">
    <div class="row align-items-center justify-content-center">


        <div class="col-md-6 text-center">
          <h2 class="lead mb-3">
            <strong>Welcome back!</strong><br>
            Sign in to search unlimited hashtags.
          </h2>
          <form class="form" @submit.prevent="signIn">
              <div class="form-group">
                <input type="email" class="form-control" id="email" placeholder="Email address" required autofocus
                  v-model="email">
              </div>
              <div class="form-group">
                <input type="password" class="form-control" id="password" placeholder="Password" aria-describedby="forgotPassword" required
                  ref="password"
                  v-model="password">
                <small id="forgotPassword" class="form-text text-muted"><router-link :to="{ name: 'ResetPassword' }">Forgot password?</router-link></small>
              </div>
              <button type="submit" class="btn btn-primary">Log In</button>
            </form>
          
          <br>No account? <u><strong><a href="javscript:;" @click="goToSignUp">Create one</a></strong></u>
        </div>



    </div>
</div>


</template>

<script>
import firebase from 'firebase'

export default {
  name: 'signin',

  data: function() {
    return {
      email: '',
      password: '',
    }
  },
  methods: {
    signIn: async function() {
      try {
        // const checkIfEmailExists = await firebase.auth().fetchSignInMethodsForEmail(this.email)
        // if (!checkIfEmailExists.includes('password')) return alert('Your email or password is invalid')

        const signedInUser = await firebase.auth().signInWithEmailAndPassword(this.email, this.password)
        localStorage.setItem("hb_signedinbefore", 1)
        return this.$router.push(this.$route.query.redirect || '/search')
      } catch(err) {
        alert(err.message)
      }
    },
    goToSignUp: function () {
      localStorage.removeItem("hb_signedinbefore")
      this.$router.push( { name: 'Signup' } )
    },
  }
}
</script>

<style scoped lang="sass">

h2.lead
  line-height: 1.8
  font-weight: 400

input
  font-size: 1.15rem
  text-align: center

</style>