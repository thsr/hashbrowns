<template>
<modal name="delete-account-modal" transition="fade-slide-y" height="auto">
<div class="p-3">


          <form class="form" @submit.prevent="deleteAccount">
   <!--          <h2 class="lead mb-3">

            <strong>Delete your account</strong><br><br>
We’re sorry to see you go. Once your account is deleted, all of your content will be permanently gone.
<br><br>
To confirm deletion, type your password below:
            </h2> -->
            <h5>Delete your account</h5>
            <p>We’re sorry to see you go. Once your account is deleted,<br>
            all of your content will be permanently gone.</p>
            <p>To confirm deletion, type your password below:</p>
            <div class="form-group">
              <input type="password" class="form-control" id="password2" placeholder="Confirm Password" aria-describedby="confirmPassword" required
                ref="step2"
                v-model="confirmPassword">
            </div>
            <button type="button" class="btn btn-secondary mr-3"  @click.prevent="$modal.hide('delete-account-modal')">Cancel</button>
            <button type="submit" class="btn btn-primary">Confirm deletion</button>
          </form>


</div>
</modal>
</template>

<script>
import firebase from 'firebase'

export default {
  name: 'delete-account-modal',

  props: ['text'],

  data () {
    return {
      user: {},
      confirmPassword: ''
    }
  },

  created () {
    this.user = firebase.auth().currentUser
  },

  computed: {

  },

  methods: {
    deleteAccount: async function () {
      try {
        const user = firebase.auth().currentUser
        const credentials = firebase.auth.EmailAuthProvider.credential( this.user.email, this.confirmPassword )
        const reAuth = await user.reauthenticateAndRetrieveDataWithCredential(credentials)
        const deleteAccount = await user.delete()
        this.$modal.hide('delete-account-modal')
        this.$router.push('/')
      } catch (err) {
        alert(err.message)
      }

    }
  }
}
</script>

<style scoped lang="sass">
.form
  text-align: center
</style>