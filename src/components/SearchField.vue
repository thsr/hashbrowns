<!--==============================
=            template            =
===============================-->

<template>
<div id="searchfield">


<form  @submit.prevent="submitForm" action>
  <b-input-group>
    <feather-icon type="hash"></feather-icon>
    <b-form-input id="searchfieldInput" 
                  v-model="searchTerm"
                  name="searchTerm"
                  type="text" 
                  size="lg" 
                  :state="hasSpecialCharactersState" 
                  aria-describedby="searchfieldInputFeedback" 
                  :placeholder="searchedHashtag"></b-form-input>
    <b-input-group-append>
      <b-btn variant="outline-secondary" size="lg" text="Button" type="submit"><feather-icon type="search"></feather-icon></b-btn>
    </b-input-group-append>
  </b-input-group>
  <b-form-invalid-feedback :class="{ 'invalid-feedback-visible': hasSpecialCharacters }" id="searchfieldInputFeedback">
      Hashtags can't have special characters :(
  </b-form-invalid-feedback>
</form>


</div>
</template>


<!--============================
=            script            =
=============================-->
<script>
import { debounce } from 'lodash'
import { mixin as focusMixin }  from 'vue-focus'

export default {
  name: 'search-field',
  props: {
    searchedHashtag: {
      default: 'TypeYourHashtag'
    },
    initFocused: {
      default: false
    }
  },
  mixins: [ focusMixin ],
  data: function () {
    return {
      searchTerm: '',
      focused: true
    }
  },
  computed: {
    hasSpecialCharacters () {
      return /[^a-zA-Z0-9_ÂÃÄÀÁÅÆÇÈÉÊËÌÍÎÏÐÑÒÓÔÕÖØÙÚÛÜÝÞßàáâãäåæçèéêëìíîïðñòóôõöøùúûüýþÿ]/.test(this.searchTerm)
    },
    hasSpecialCharactersState () {
      return !this.hasSpecialCharacters || this.name == '' ? null : false
    }
  },
  methods: {
    submitForm: debounce(function () {
      this.$validator.validateAll().then( (result) => {
        if (!this.hasSpecialCharacters) {
          this.$router.push('/search/' + this.searchTerm.toLowerCase())
          this.focused = false
          return
        }
      })
      },
      1000,
      {'leading': true,'trailing': false}
    )
  }

}
</script>


<!--===========================
=            style            =
============================-->

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="sass">

</style>
