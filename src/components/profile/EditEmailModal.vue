<template>
<modal name="edit-email-modal" transition="fade-slide-y" height="auto">
<div class="p-3">


          <form class="form" @submit.prevent="saveEmailEdit">
<!--             <h2 class="lead mb-3">

            <strong>Change your email address</strong><br><br>
              Please type your new email address and confirm your password.
            </h2> -->
            <h5>Change your email address</h5>
            <p>Please type your new email address and confirm your password below:</p>
            <div class="form-group">
              <input type="email" class="form-control" id="email2" placeholder="New email address" autofocus
                v-model="updatedEmail">
            </div>
            <div class="form-group">
              <input type="password" class="form-control" id="password2" placeholder="Confirm Password" aria-describedby="confirmPassword" required
                ref="step2"
                v-model="confirmPassword">
            </div>
            <button type="button" class="btn btn-secondary mr-3"  @click.prevent="$modal.hide('edit-email-modal')">Cancel</button>
            <button type="submit" class="btn btn-primary">Change Email</button>
          </form>


</div>
</modal>
</template>

<script>
import firebase from 'firebase/app'

export default {
  name: 'edit-email-modal',

  props: ['text'],

  data () {
    return {
      user: {},
      updatedEmail: '',
      confirmPassword: ''
    }
  },

  created () {
    this.user = firebase.auth().currentUser
    this.updatedEmail = ''//firebase.auth().currentUser.email
  },

  computed: {

  },

  methods: {
    saveEmailEdit: async function () {
      try {
        const user = firebase.auth().currentUser
        const credentials = firebase.auth.EmailAuthProvider.credential( this.user.email, this.confirmPassword )
        const reAuth = await user.reauthenticateAndRetrieveDataWithCredential(credentials)
        const updateEmail = await user.updateEmail(this.updatedEmail)
        this.$emit('emailUpdated',this.updatedEmail)
        this.confirmPassword = ''
        dataLayer.push({
          event: 'account_email_update',
          email: this.updatedEmail
        })
        this.$modal.hide('edit-email-modal')
      } catch (err) {
        dataLayer.push({
          event: 'account_email_update_error', error_code: err.code, error_message: err.message
        })
        alert(err.message)
      }

    }
  }
}
</script>

<style scoped lang="sass">
.form
  text-align: center
input
  text-align: center
</style>