<template>

<div class="container container-full-page">
    <div class="row align-items-center justify-content-center">
        <div class="col-md-6 text-center">            
            <h1 class="display-5">Trending tags for your content</h1>
            <h2 class="lead mb-5">
                Get more&nbsp;followers. More&nbsp;likes. More&nbsp;better.<br>
                We serve hashtags for breakfast.
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