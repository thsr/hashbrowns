<template>

<div class="container container-full-page">
    <div class="row align-items-center justify-content-center">
        <div class="col-md-6 text-center">
            <img src="./../../assets/logo4.png" style="width:300px; max-width:100%;" class="mb-3">
            <h1 class="display-5">We serve hashtags for breakfast </h1>
            <h2 class="lead mb-5">
                Find popular related&nbsp;hashtags.<br>
                Get more&nbsp;followers. More&nbsp;likes. More&nbsp;better.
            </h2>

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

<style lang="sass" scoped>
h2.lead
    line-height: 1.4
</style>