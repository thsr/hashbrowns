<template>

<div class="container container-full-page">
    <div class="row align-items-center justify-content-center">


  <transition name="fade-slide-y" mode="out-in" >

        <div v-if="currentStep == 'email'" :key="'currentStep'+currentStep" class="col-md-6 text-center">
          <h2 class="lead mb-3">
            <span v-if="hasTooManySearches">
              <strong>You've made 3 hashtag searches.</strong><br>
              Sign in or create an account to&nbsp;go&nbsp;unlimited!
            </span>
            <span v-if="!hasTooManySearches">
              <strong>Search unlimited hashtags!</strong><br>
              Sign in or create an account.
            </span>
          </h2>
          <form class="form" @submit.prevent="checkIfEmailExists">
            <div class="form-group">
              <input type="email" class="form-control" id="email1" placeholder="Email address" required
                ref="step1"
                v-model="email"
                :autofocus="currentStep == 'email'">
            </div>
            <button type="submit" class="btn btn-primary">Next</button>
          </form>

          <br>Step 1/2
        </div>




        <div v-if="currentStep == 'signin'" :key="'currentStep'+currentStep" class="col-md-6 text-center">
          <h2 class="lead mb-3">
            <strong>Welcome back!</strong><br>
            Enter your password.
          </h2>
          <form class="form" @submit.prevent="signIn">
              <div class="form-group">
                <input type="email" class="form-control" id="email2" placeholder="Email address" readonly
                  v-model="email"
                  >
              </div>
              <div class="form-group">
                <input type="password" class="form-control" id="password2" placeholder="Password" aria-describedby="forgotPassword" required
                  ref="step2"
                  v-model="password"
                  v-focus="currentStep == 'signin'"
                  >
                <small id="forgotPassword" class="form-text text-muted"><a href="javascript:;" @click="goToStep4">Forgot password?</a></small>
              </div>
              <button type="button" class="btn btn-secondary mr-3" @click.prevent="goToStep1">Back</button>
              <button type="submit" class="btn btn-primary">Log In</button>
            </form>
          
          <br><span>Step 2/2</span>
        </div>





        <div v-if="currentStep == 'reauth'" :key="'currentStep'+currentStep" class="col-md-6 text-center">
          <h2 class="lead mb-3">
            <strong>Please re-authenticate.</strong><br>
            Enter your email and password.
          </h2>
          <form class="form" @submit.prevent="signIn">
              <div class="form-group">
                <input type="email" class="form-control" id="email2" placeholder="Email address"
                  v-model="email"
                  :autofocus="currentStep == 'reauth'">
              </div>
              <div class="form-group">
                <input type="password" class="form-control" id="password2" placeholder="Password" aria-describedby="forgotPassword" required
                  ref="step2"
                  v-model="password">
              </div>
              <button type="submit" class="btn btn-primary">Re-authenticate</button>
            </form>
        </div>



        <div v-if="currentStep == 'signup'" :key="'currentStep'+currentStep" class="col-md-6 text-center">
          <h2 class="lead mb-3">
            <strong>Welcome! Create a new account.</strong><br>
            Choose a password.
          </h2>
          <form class="form" @submit.prevent="signUp">

            <div class="form-group">
              <input type="email" class="form-control" id="email3" placeholder="Email address" readonly
                v-model="email">
            </div>
            <div class="form-group">
              <input type="password" class="form-control" id="password3" placeholder="Password" required
                ref="step3"
                v-model="password"
                v-focus="currentStep == 'signup'">
            </div>
            <button type="button" class="btn btn-secondary mr-3" @click.prevent="goToStep1">Back</button>
            <button type="submit" class="btn btn-primary">Sign Up</button>
          </form>
          
          <br><span>Step 2/2</span>
        </div>




        <div v-if="currentStep == 'reset'" :key="'currentStep'+currentStep" class="col-md-6 text-center">
          <h2 class="lead mb-3">
            <strong>Reset your password.</strong><br>
            You will receive an email with a&nbsp;reset&nbsp;link.
          </h2>
          <form class="form" @submit.prevent="resetPassword">
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


</template>

<script>
import firebase from 'firebase'
import { mixin as focusMixin }  from 'vue-focus'

export default {
  name: 'auth',
  mixins: [ focusMixin ],
  beforeRouteEnter (to, from, next) {
    if (['email','signin','reauth','signup','reset'].indexOf(to.params.urlStep) > -1) {
      next()
    }
    else {
      next('/auth/email')
    }
  },
  data: function() {
    return {
      currentStep: this.$route.params.urlStep,
      email: '',
      password: '',
      emailReset: '',
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
            this.goToStep2()
          } else { 
            this.goToStep3()
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
          this.$router.push(this.$route.query.redirect || '/search')
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
      this.$router.push('/auth/email')
      this.currentStep = 'email'
      this.password = ''
    },
    goToStep2: function() {
      this.$router.push('/auth/signin')
      this.currentStep = 'signin'
      this.password = ''
    },
    goToStep3: function() {
      this.$router.push('/auth/signup')
      this.currentStep = 'signup'
      this.password = ''
    },
    goToStep4: function() {
      this.$router.push('/auth/reset')
      this.currentStep = 'reset'
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