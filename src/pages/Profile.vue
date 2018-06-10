<template>

<div class="container container-regular-page">
  <div class="row">
    <div class="col-md-6 offset-md-3 mt-5">
            <h2>Profile</h2>
            <hr>
    </div>



    <div class="col-9 col-md-4 offset-md-3">
            <h5>Sign out</h5>
            <span>Sign out of the current session on the current device</span>
    </div>
    <div class="col-3 col-md-2 d-flex align-items-center justify-content-end">
            <router-link :to="{ path: '/signout' }" class="btn btn-outline-primary">Sign out</router-link>
    </div>



    <div class="col-md-6 offset-md-3">
            &nbsp;
    </div>
    <div class="col-md-6 offset-md-3 mt-5">
            <h2>Settings</h2>
            <hr>
    </div>




    <div class="col-9 col-md-4 offset-md-3">
            <h5>Your email</h5>
            <div class="my-3" v-if="!editingEmail">{{this.user.email}}</div>

            <form v-if="editingEmail" class="form-inline" @submit.prevent="saveEmailEdit">
            <input type="email" class="form-control m-0" id="email1" placeholder="Email address" required
              ref="step1"
              v-model="editedEmail"
              v-focus="editingEmail">
          </form>
    </div>
    <div class="col-3 col-md-2 d-flex align-items-center justify-content-end">
            <a v-if="!editingEmail" href="javascript:;" @click="editEmail" class="btn btn-outline-primary">Edit email</a>
            <a v-if="editingEmail" href="javascript:;" @click="saveEmailEdit" class="btn btn-primary">Save <i v-if="savingEmail" class="fa fa-circle-o-notch fa-spin"></i></a>
    </div>





 
    <div class="col-md-6 offset-md-3"> 
            <hr>
    </div>



    <div class="col-9 col-md-4 offset-md-3">
            <h5>Your password</h5>
            <span>&bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;</span>
    </div>
    <div class="col-3 col-md-2 d-flex align-items-center justify-content-end">
            <a href="javascript:;" @click="resetPassword" class="btn btn-outline-primary">Change password</a>
    </div>






 
    <div class="col-md-6 offset-md-3"> 
            <br><br><br><hr>
    </div>



    <div class="col-md-6 offset-md-3">
            <h5>Delete account</h5>
            <p>Permanently delete your account and all of your content</p>
            <p><a href="javascript:;" @click="resetPassword">Delete account</a></p>
    </div>




  </div>
</div>

</template>

<script>
import firebase from 'firebase'
import { mixin as focusMixin }  from 'vue-focus'

export default {
  name: 'profile',
  mixins: [ focusMixin ],

  data: function() {
    return {
      editingEmail: this.$route.query.editingEmail || false,
      editedEmail: '',
      savingEmail: false,
      user: {}
    }
  },

  beforeMount () {
    this.user = firebase.auth().currentUser
  },

  methods: {

    resetPassword: function() {
      // alert("reset pw disabled")
      // return
      firebase.auth().sendPasswordResetEmail(this.user.email).then(() => {
        alert("An email has been sent to you. Use the link in your email to change your password.")
      }).catch(function(err) {
          alert(err.message)
      })
    },

    editEmail: function() {
      // this.$router.push('/auth/reauth?redirect=/profile')
      this.editingEmail = true
      this.editedEmail = firebase.auth().currentUser.email
    },

    saveEmailEdit: function() {
      this.savingEmail = true

      firebase.auth().currentUser.updateEmail(this.editedEmail).then( () => {
        this.editingEmail = false
        this.savingEmail = false
      }).catch( (err) => {
        // err.code == 'auth/requires-recent-login'
        if (err.code == 'auth/requires-recent-login') {
          this.$router.push('/auth/reauth?redirect=/profile?editingEmail=1')
        } else {
          alert(err.message)
        }
        this.savingEmail = false
      })
    }
  }
}
</script>

<style scoped lang="sass">
h5
  font-weight: bold
</style>
