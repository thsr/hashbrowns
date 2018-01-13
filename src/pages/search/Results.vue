<template>



<div class="container container-regular-page my-5">
    <div class="row align-items-top justify-content-left">

        <div class="col-md-6 offset-md-3 text-center">
            <search-field :searchedHashtag="$route.params.tag"></search-field>
        </div>

        <div class="w-100"></div>

        <div v-if="loading" class="col-12 text-center">
            <i class="fa fa-circle-o-notch fa-spin fa-2x"></i>
        </div>

        <div v-if="error" class="col-12 text-center">
          {{error}}
        </div>

        <div v-if="searchResult" class="col-12">
          <div class="col-md-12 text-center">
              <div v-if="searchResult.data.length > 0 && listOfSelected.length < 1" class="text-center">
                <button type="button" class="btn btn-primary" disabled>Select tags to copy to clipboard</button>
              </div>
              <div v-else-if="listOfSelected.length > 0" class="text-center">
                <b-btn id="copySelected" v-clipboard:copy="listOfSelectedCopiable" v-clipboard:success="onCopy" variant="primary">Copy selection ({{listOfSelected.length}}) to clipboard</b-btn>
                <b-tooltip disabled :show.sync="isCopied" target="copySelected" placement="top">Copied!</b-tooltip>
              </div>
          </div>
          
          
          <div class="col-md-12">
              <div id="searchresults" class="row mt-5 align-items-center">
                  <div class="col-6 col-md-4 my-2 text-center searchresults-tag" v-for="tag in searchResult.data">
                    <a @click="tag.isSelected = !tag.isSelected" href="javascript:;" class="pb-1" :class="{'is-selected': tag.isSelected}">#{{tag.text}}</a>
                  </div>
                </div>
          </div>
        </div>

    </div>
</div>

</div>







</template>

<script>
import axios from 'axios'
import SearchField from '@/components/SearchField.vue'

export default {
  data () {
    return {
      loading: false,
      searchResult: {data: []},
      error: {},
      isCopied: false,
      //tmp
      show: true
    }
  },

  mounted () {
    this.fetchData()

  },

  watch: {
    // call again the method if the route changes
    '$route': 'fetchData'
  },

  components: {
    SearchField
  },

  computed: {
    listOfSelected () {
      return this.searchResult.data.filter( o => o.isSelected);
    },
    listOfSelectedCopiable () {
      return this.searchResult.data
        .filter( o => o.isSelected)
        .map( o => {
          return '#' + o.text;
        })
        .join(' ')
    }
  },

  methods: {
    throwError (e) {
      this.error = e
    },

    fetchData () {
      if ( /[^a-zA-Z0-9_ÂÃÄÀÁÅÆÇÈÉÊËÌÍÎÏÐÑÒÓÔÕÖØÙÚÛÜÝÞßàáâãäåæçèéêëìíîïðñòóôõöøùúûüýþÿ]/.test(this.$route.params.tag) ) {
        this.throwError('hashtags can\'t have special characters :(')
      } else {
        this.error = null
        this.searchResult = {data: []}
        this.loading = true
        this.$Progress.start()

        const endpoint = process.env.HB_ENDPOINT + '/search/' + this.$route.params.tag

        axios.get(endpoint)
        .then( (res) => {
          this.loading = false
          this.$Progress.finish()

          if (res.data.data.length == 0) {
            this.throwError('no hashtags found :(')
          } else {
            const originalSearchResult = [{ text: this.$route.params.tag, isSelected: true }]
            const returnedSearchResult = res.data.data.map( o => {
              return { text: o.text, isSelected: false } 
            })
            this.searchResult.data = originalSearchResult.concat(returnedSearchResult)
          }

          dataLayer.push({
            event: 'hashtag_search',
            tag_name: this.$route.params.tag,
            nb_results: res.data.data.length.toString()
            
          })
        })
        .catch( (error) => {
          this.loading = false
          this.$Progress.finish()
          this.throwError(error.response.data)

          dataLayer.push({
            event: 'hashtag_search_error',
            tag_name: this.$route.params.tag,
            error_response: error.response.data.toString()
            
          })
        })
      }
    },

    onCopy () {
      dataLayer.push({
        event: 'hashtag_search_clipboard',
        tag_name: this.$route.params.tag,
        nb_results: this.searchResult.data.length.toString(),
        nb_copied: this.listOfSelected.length.toString()
        
      })

      this.isCopied = true;
      setTimeout( () => {
        this.isCopied = false;
      }, 1000)


    }
  }
}
</script>

<style>


</style>