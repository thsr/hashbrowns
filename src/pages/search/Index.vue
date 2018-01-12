<template>

<div class="container container-full-page">
    <div class="row align-items-center justify-content-center">
        <div class="col-md-6 text-center">
            <h1 class="display-5">We serve hashtags for breakfast </h1>
            <p class="lead">
                Find popular related&nbsp;hashtags.
                <br> Get more&nbsp;followers. More&nbsp;likes. More&nbsp;better.
            </p>

            <search-field></search-field>


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