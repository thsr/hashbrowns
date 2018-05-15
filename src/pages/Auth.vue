<template>

<div class="container container-full-page">
    <div class="row align-items-center justify-content-center">


  <transition name="fade-slide-y" mode="out-in" >

        <div v-if="currentStep == 1" :key="'currentStep'+currentStep" class="col-md-6 text-center">
          <h2 class="lead mb-3">
            <span v-if="hasTooManySearches">
              <strong>You've made 3 hashtag searches.</strong><br>
              Log in or create an account to&nbsp;go&nbsp;unlimited!
            </span>
            <span v-if="!hasTooManySearches">
              <strong>Search unlimited hashtags!</strong><br>
              Log in or create an account.
            </span>
          </h2>
          <form class="form-email" @submit.prevent="checkIfEmailExists">
            <div class="form-group">
              <input type="email" class="form-control" id="email1" placeholder="Email address" required
                ref="step1"
                v-model="email"
                v-focus="currentStep == 1">
            </div>
            <button type="submit" class="btn btn-primary">Next</button>
          </form>

          <br>Step 1/2
        </div>




        <div v-if="currentStep == 2" :key="'currentStep'+currentStep" class="col-md-6 text-center">
          <h2 class="lead mb-3">
            <strong>Welcome back!</strong><br>
            Enter your password.
          </h2>
          <form class="form-signin" @submit.prevent="signIn">

              <div class="form-group">
                <input type="email" class="form-control" id="email2" placeholder="Email address" readonly 
                  v-model="email">
              </div>
              <div class="form-group">
                <input type="password" class="form-control" id="password2" placeholder="Password" aria-describedby="forgotPassword" required
                  ref="step2"
                  v-model="password"
                  v-focus="currentStep == 2">
                <small id="forgotPassword" class="form-text text-muted"><a href="javascript:;" @click="goToStep4">Forgot password?</a></small>
              </div>
              <button type="button" class="btn btn-secondary mr-3" @click.prevent="goToStep1">Back</button>
              <button type="submit" class="btn btn-primary">Log In</button>
            </form>
          
          <br>Step 2/2
        </div>



        <div v-if="currentStep == 3" :key="'currentStep'+currentStep" class="col-md-6 text-center">
          <h2 class="lead mb-3">
            <strong>Welcome! Create a new account.</strong><br>
            Choose a password.
          </h2>
          <form class="form-signup" @submit.prevent="signUp">

            <div class="form-group">
              <input type="email" class="form-control" id="email3" placeholder="Email address" readonly
                v-model="email">
            </div>
            <div class="form-group">
              <input type="password" class="form-control" id="password3" placeholder="Password" required
                ref="step3"
                v-model="password"
                v-focus="currentStep == 3">
            </div>
            <button type="button" class="btn btn-secondary mr-3" @click.prevent="goToStep1">Back</button>
            <button type="submit" class="btn btn-primary">Sign Up</button>
          </form>
          
          <br>Step 2/2
        </div>




        <div v-if="currentStep == 4" :key="'currentStep'+currentStep" class="col-md-6 text-center">
          <h2 class="lead mb-3">
            <strong>Reset your password.</strong><br>
            You will receive an email with a&nbsp;reset&nbsp;link.
          </h2>
          <form class="form-signup" @submit.prevent="resetPassword">
            <div class="form-group">
              <input type="email" class="form-control" id="email4" placeholder="Email address" required
                ref="step4"
                v-model="emailReset">
            </div>
            <button type="button" class="btn btn-secondary mr-3" @click.prevent="goToStep1">Back</button>
            <button type="submit" class="btn btn-primary">Reset your password</button>
          </form>
        </div>


</transition>
    </div>
</div>


<!-- 
<div class="container">
  <div class="auth text-center col-md-4 offset-md-4">
  


<transition name="fade-slide-y" mode="out-in" :key="'currentstep'+currentStep">
<div>
  <form class="form-email" @submit.prevent="checkIfEmailExists" >
    <p class="lead text-center">Log In or Sign Up</p>

    <div class="form-group">
      <input type="email" class="form-control" id="email1" placeholder="Email address" required
        ref="step1"
        v-model="email"
        v-focus="currentStep == 1">
    </div>
    <button type="submit" class="btn btn-primary">Next</button>
  </form>
</div>

<div v-if="currentStep == 2">
  <form class="form-signin" @submit.prevent="signIn">
    <p class="lead text-center">Welcome back!</p>

    <div class="form-group">
      <input type="email" class="form-control" id="email2" placeholder="Email address" readonly 
        v-model="email">
    </div>
    <div class="form-group">
      <input type="password" class="form-control" id="password2" placeholder="Password" aria-describedby="forgotPassword" required
        ref="step2"
        v-model="password"
        v-focus="currentStep == 2">
      <small id="forgotPassword" class="form-text text-muted"><a href="javascript:;" @click="goToStep4">Forgot password?</a></small>
    </div>
    <button type="button" class="btn btn-secondary mr-3" @click.prevent="goToStep1">Back</button>
    <button type="submit" class="btn btn-primary">Log In</button>
  </form>
</div>

<div v-if="currentStep == 3">
  <form class="form-signup" @submit.prevent="signUp">
    <p class="lead text-center">Create a new account</p>

    <div class="form-group">
      <input type="email" class="form-control" id="email3" placeholder="Email address" readonly
        v-model="email">
    </div>
    <div class="form-group">
      <input type="password" class="form-control" id="password3" placeholder="Password" required
        ref="step3"
        v-model="password"
        v-focus="currentStep == 3">
    </div>
    <button type="button" class="btn btn-secondary mr-3" @click.prevent="goToStep1">Back</button>
    <button type="submit" class="btn btn-primary">Sign Up</button>
  </form>
</div>

<div v-if="currentStep == 4">
  <form class="form-signup" @submit.prevent="resetPassword">
    <p class="lead text-center">Reset your password</p>

    <div class="form-group">
      <input type="email" class="form-control" id="email4" placeholder="Email address" required
        ref="step4"
        v-model="emailReset">
    </div>
    <button type="button" class="btn btn-secondary mr-3" @click.prevent="goToStep1">Back</button>
    <button type="submit" class="btn btn-primary">Reset your password</button>
  </form>
</div>

</transition>


<br>
<br>
<br>
  
<small class="text-muted">Test account:<br>
  <code>abc@gmail.com</code><br>
  <code>abc123</code></small>


  </div>
</div> -->
</template>

<script>
import firebase from 'firebase'
import { mixin as focusMixin }  from 'vue-focus'
export default {
  name: 'auth',
  mixins: [ focusMixin ],
  data: function() {
    return {
      show: 1,
      currentStep: 1,
      focused: 1,
      email: '',
      password: '',
      emailReset: '',
      resetEmailSentCountdown: 0
    }
  },
  computed: {
    hasTooManySearches () {
      if (localStorage.getItem("hb_maincomponent")) return (parseInt(localStorage.getItem("hb_maincomponent")) >= 3)
      else false
    }
  },
  methods: {
    checkIfEmailExists: function() {
      firebase.auth().fetchSignInMethodsForEmail(this.email).then( // firebase.auth().fetchProvidersForEmail(this.email).then(
        (res) => {
          if (res.includes('password')) {
            this.currentStep = 2
          } else { 
            this.currentStep = 3
          }
        },
        (err) => {
          alert(err.message)
        }
      )
    },
    signIn: function() {
      firebase.auth().signInWithEmailAndPassword(this.email, this.password).then(
        (user) => {
          this.$router.push('/search')
        },
        (err) => {
          alert(err.message)
        }
      )
    },
    signUp: function() {
      // alert("sign up disabled")
      // return
      firebase.auth().createUserWithEmailAndPassword(this.email, this.password).then(
        (user) => {
          this.$router.push('/search')
        },
        (err) => {
          alert(err.message)
        }
      )
    },
    resetPassword: function() {
      // alert("reset pw disabled")
      // return
      firebase.auth().sendPasswordResetEmail(this.emailReset).then(() => {
        alert("Email sent. Use the link in your email to reset your password.")
        this.goToStep2()
      }).catch(function(err) {
          alert(err.message)
      })
    },
    goToStep1: function() {
      this.currentStep = 1
      this.password = ''
    },
    goToStep2: function() {
      this.currentStep = 2
      this.password = ''
    },
    goToStep4: function() {
      this.currentStep = 4
      this.password = ''
    }
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