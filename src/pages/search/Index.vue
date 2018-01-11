<template>
<div id="search-c">

<div class="hero is-medium">
  <div class="hero-body">
    
    <div class="container">
      <div class="columns">
      
    
      
        <div class="column is-half is-offset-one-quarter has-text-centered">
          <h1 class="title is-1 is-spaced" >
            We serve hashtags for breakfast <br>
          </h1>
          <h2 class="subtitle is-4">
            Find popular related&nbsp;hashtags.<br>
            Get more&nbsp;followers. More&nbsp;likes. More&nbsp;better.
          </h2>
        </div>
      
      </div>
    
    
      <div class="columns">
        <div class="column is-half is-offset-one-quarter has-text-centered">

          <search-field :initFocused="true"></search-field>

        </div>
      
      </div>
    </div>

  </div>
</div>



</div>
</template>

<script>
import SearchField from '@/components/SearchField.vue'

export default {

  name: 'search',

  components: {
    SearchField
  }
};
</script>

<style lang="css" scoped>
</style>