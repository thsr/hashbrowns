<template>

<div class="container container-full-page">
    <div class="row align-items-center justify-content-center">
        <div class="col-md-6 text-center">            
            <h1 class="display-5">Trending tags for your content.</h1>
            <h2 class="lead mb-5">
                Find hashtag ideas. Get more likes and followers.
            </h2>

            <search-field class="mb-5"></search-field>


        </div>
    </div>
</div>

</template>

<script>

/*
Trending tags for your content
Get more followers. More likes. More better.
We serve hashtags for breakfast.

Trending tags for your content
Find hashtag ideas. Get more likes and followers.

*/




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