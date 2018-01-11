<template>
<div id="search-results-c">

<div class="hero">
  <div class="hero-body">
    
    <div class="container">
  
      <div class="columns">
        <div class="column is-half is-offset-one-quarter has-text-centered">

          <search-field :searchedHashtag="$route.params.tag"></search-field>

        </div>
      </div>

    </div>

  </div>
</div>

<section>
  <div class="container">

    <div class="columns">
      <div id="taglist" class="column">

        <ul v-if="loading" class="loading">
              <span class="icon is-small">
                <i class="fa fa-circle-o-notch fa-spin"></i>
              </span>
        </ul>

        <ul v-if="error" class="error">
          <li>{{error}}</li>
        </ul>

        <ul v-if="searchResult">
          <li v-for="tag in searchResult.data" :class="{'selected': tag.isSelected}">
            <a href="javascript:;" v-on:click="tag.isSelected = !tag.isSelected">#{{tag.text}}</a>
          </li>
        </ul>


      </div>
    </div>

    <div v-if="searchResult" class="columns">
      <div id="resultcontrols" class="column">
        <ul>
          <li v-if="searchResult.data.length > 0 && listOfSelected.length < 1">
            select some tags to copy them to clipboard
          </li>
          <li v-else-if="listOfSelected.length > 0" class="selected">
            <a href="javascript:;" v-clipboard:copy="listOfSelectedCopiable" v-clipboard:success="onCopy">copy {{listOfSelected.length}} selected to clipboard</a>
          </li>

          <transition name="fade">
            <li v-if="isCopied">
              copied
              <span class="icon is-small">
                <i class="fa fa-check fa-fw"></i>
              </span>
            </li>
          </transition>

        </ul>
      </div>
    </div>

  </div>
</section>

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
      isCopied: false
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
      return '#' + this.$route.params.tag + ' ' + this.searchResult.data
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

            dataLayer.push({
              event: 'hashtag_search',
              category: 'hashtag_search-nofound',
              action: this.$route.params.tag,
              label: ''
            })

          } else {

            this.searchResult.data = res.data.data.map( o => {
              return { text: o.text, isSelected: false } 
            })

            dataLayer.push({
              event: 'hashtag_search',
              category: 'hashtag_search-success',
              action: this.$route.params.tag,
              label: res.data.data.length.toString()
            })

          }

        })
        .catch( (error) => {
          this.loading = false
          this.$Progress.finish()
          this.throwError(error.response.data)

          dataLayer.push({
            event: 'hashtag_search',
            category: 'hashtag_search-error',
            action: this.$route.params.tag,
            label: error.response.data.toString()
          })
        })
      }
    },

    onCopy () {
      this.isCopied = true;
      setTimeout( () => {
        this.isCopied = false;
      }, 1700);
    }
  }
}
</script>