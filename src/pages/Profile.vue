<template>



<div class="container container-regular-page">
<edit-email-modal @emailUpdated="updateEmail" />
<delete-account-modal />
  <div class="row">

    <div class="col-md-6 offset-md-3 mt-5">
            <h2>Profile</h2>
            <hr>
    </div>


    <div class="col-9 col-md-4 offset-md-3">
            <h4>Your email</h4>
            <p>{{this.userEmail}}</p>
            <p><a href="javascript:;" @click="editEmail">Change your email address</a></p>

    </div>




 
    <div class="col-md-6 offset-md-3"> 
            <hr>
    </div>



    <div class="col-9 col-md-4 offset-md-3">
            <h4>Your password</h4>
            <p>&bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;</p>
            <p><a href="javascript:;" @click="resetPassword">Change your password</a></p>
    </div>
<!--     <div class="col-3 col-md-2 d-flex align-items-center justify-content-end">
            <a href="javascript:;" @click="resetPassword" class="btn btn-outline-primary">Change password</a>
    </div> -->






 
    <div class="col-md-6 offset-md-3">
            <hr>
    </div>



    <div class="col-md-6 offset-md-3">
            <h4>Delete account</h4>
            <p>Permanently delete your account and all of your content</p>
            <p><a href="javascript:;" @click="deleteAccount">Delete account</a></p>
    </div>




  </div>
</div>

</template>

<script>
import firebase from 'firebase'
import { mixin as focusMixin }  from 'vue-focus'

import EditEmailModal from './../components/profile/EditEmailModal.vue'
import DeleteAccountModal from './../components/profile/DeleteAccountModal.vue'

export default {
  name: 'profile',
  mixins: [ focusMixin ],

  components: {
    EditEmailModal,
    DeleteAccountModal
  },

  data: function() {
    return {
      editingEmail: this.$route.query.editingEmail || false,
      editedEmail: '',
      userEmail: '',
      savingEmail: false,
      user: {}
    }
  },

  created () {
    firebase.auth().onAuthStateChanged( (user) => {
      if (user) {
        this.user = user
        this.userEmail = user.email
      } else {
        this.user = null
      }
    })
  },


  methods: {

    resetPassword: async function() {
      try {
        const sendPass = await firebase.auth().sendPasswordResetEmail(this.user.email)
        dataLayer.push({
          event: 'reset_password'
        })
        alert('An email has been sent to you. Use the link in your email to change your password.')
      } catch (err) {
        dataLayer.push({
          event: 'reset_password_error', error_code: err.code, error_message: err.message
        })
        alert(err.message)
      }
    },

    editEmail: function() {
      this.$modal.show('edit-email-modal')
    },
    updateEmail: function(newEmail) {
      this.userEmail = newEmail
    },

    deleteAccount: function() {
      this.$modal.show('delete-account-modal')
    },

  }
}
</script>

<style scoped lang="sass">
h4
  font-weight: bold
</style>
