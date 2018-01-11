<!--==============================
=            template            =
===============================-->

<template>
<div id="search-field-c">
  
<form  @submit.prevent="submitForm" action>
  <div class="field">

    <p class="control has-icons-left has-icons-right">
      <input class="input is-large"
             v-model="searchTerm"
             name="searchTerm"
             v-validate="{ rules: { specialChars: true } }"
             :class="{'input': true, 'is-large': true, 'is-danger': errors.has('searchTerm') }" 
             type="text"
             :placeholder="searchedHashtag"
             v-focus="focused"
             @focus="focused = true"
             @blur="focused = false">

      <span class="icon is-left">
        <i class="fa fa-hashtag"></i>
      </span>

      <span class="icon is-right" v-show="errors.has('searchTerm')">
        <i class="fa fa-warning"></i>
      </span>
    </p>

    <p class="help is-danger" style="margin-top: 1em;margin-left: 2em;">
      <span v-if="errors.has('searchTerm')">
        {{ errors.first('searchTerm') }}
      </span>
      <span v-else>
        &nbsp;
      </span>
    </p>

  </div>
</form>
<!-- <span v-else id="login-prompt"><a href="/api/ig_auth/authorize_user">&rarr; login</a></span> -->
        
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
      focused: this.initFocused
    }
  },
  computed: {
    hasSpecialCharacters () {
      return /[^a-zA-Z0-9_ÂÃÄÀÁÅÆÇÈÉÊËÌÍÎÏÐÑÒÓÔÕÖØÙÚÛÜÝÞßàáâãäåæçèéêëìíîïðñòóôõöøùúûüýþÿ]/.test(this.searchTerm)
    }
  },
  methods: {
    submitForm: debounce(function () {
      this.$validator.validateAll().then( (result) => {
        if (result) {
          this.$router.push('/search/' + this.searchTerm)
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
