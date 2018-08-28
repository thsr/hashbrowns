<template>

<div class="container container-full-page">
    <div class="row align-items-center justify-content-center">


        <div class="col-md-6 text-center">
          <h2 class="lead mb-3">
            <span v-if="hasTooManySearches">
              <strong>You've made 3 hashtag searches.</strong><br>
              Create your account to&nbsp;go&nbsp;unlimited!
            </span>
            <span v-if="!hasTooManySearches">
              <strong>Search unlimited hashtags!</strong><br>
              Create your account.
            </span>
          </h2>
          <form class="form" @submit.prevent="signUp">

            <div class="form-group">
              <input type="email" class="form-control" id="email" placeholder="Email address" required autofocus
                v-model="email">
            </div>
            <div class="form-group">
              <input type="password" class="form-control" id="password" placeholder="Choose a password" required
                ref="password"
                v-model="password">
            </div>
            <div class="form-group">
              <input type="password" class="form-control" id="confirmPassword" placeholder="Confirm password" required
                ref="confirmPassword"
                v-model="confirmPassword">
            </div>
            <button type="submit" class="btn btn-primary">Sign Up</button>
          </form>
          
          <br>Already have an account? <u><strong><router-link :to="{ name: 'Signin' }">Sign in</router-link></strong></u>
        </div>



    </div>
</div>


</template>

<script>
import firebase from 'firebase/app'

export default {
  name: 'signup',
  data: function() {
    return {
      email: '',
      password: '',
      confirmPassword: ''
    }
  },
  // beforeCreate () {
  //   if (localStorage.getItem("hb_signedinbefore")) return this.$router.push({name: 'Signin'})
  // },
  computed: {
    hasTooManySearches () {
      if (localStorage.getItem("hb_maincomponent")) return (parseInt(localStorage.getItem("hb_maincomponent")) >= 3)
      else false
    },
  },
  methods: {
    signUp: async function() {
      try {
        if (this.password !== this.confirmPassword) return alert('Passwords aren\'t identical')

        const signedUpUser = await firebase.auth().createUserWithEmailAndPassword(this.email, this.password)
        localStorage.setItem("hb_signedinbefore", 1)

        dataLayer.push({
          event: 'sign_up', user_id: signedUpUser.user.uid, email: signedUpUser.user.email
        })

        return this.$router.push(this.$route.query.redirect || '/search')
      } catch(err) {
        dataLayer.push({
          event: 'sign_up_error', error_code: err.code, error_message: err.message
        })
        alert(err.message)
      }
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