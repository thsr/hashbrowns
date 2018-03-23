<template>



<div class="container container-regular-page my-5">
    <div class="row align-items-top justify-content-left">

        <div class="col-md-6 offset-md-3 text-center">
            <search-field :searchedHashtag="$route.params.tag" class="mb-4"></search-field>
        </div>

        <div class="w-100"></div>

        <div v-if="loading" class="col-12 text-center mt-5">
            <i class="fa fa-circle-o-notch fa-spin fa-2x"></i>
        </div>

        <div v-if="error" class="col-12 text-center mt-5">
          {{error}}
        </div>

        <div v-if="searchResult" class="col-12">
          <div class="d-flex justify-content-center sticky-top pt-4" v-if="searchResult.data.length > 0">
              <div v-if="listOfSelected.length < 1" class="text-center mr-3">
                <button type="button" class="btn btn-primary" disabled>Select tags to copy to clipboard</button>
              </div>

              <div v-else-if="listOfSelected.length > 0" class="text-center mr-3">
                <b-btn id="copySelected" v-clipboard:copy="listOfSelectedCopiable" v-clipboard:success="onCopy" variant="primary">Copy selection ({{listOfSelected.length}}) to clipboard</b-btn>
                <b-tooltip disabled :show.sync="isCopied" target="copySelected" placement="top">Copied!</b-tooltip>
              </div>

              <div class="dropdown">
                <button class="btn btn-secondary dropdown-toggle" type="button" id="orderByDropdown" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                  Sort by
                </button>
                <div class="dropdown-menu dropdown-menu-right" aria-labelledby="orderByDropdown">
                  <a class="dropdown-item dropdown-item-with-icon" @click.prevent="sortResultsHashtagAZ" href="javascript:;"><feather-icon type="bar-chart"></feather-icon> Hashtag A&rarr;Z</a>
                  <a class="dropdown-item dropdown-item-with-icon" @click.prevent="sortResultsHashtagZA" href="javascript:;"><feather-icon type="bar-chart-reverse"></feather-icon> Hashtag Z&rarr;A</a>
                  <div class="dropdown-divider"></div>
                  <a class="dropdown-item dropdown-item-with-icon" @click.prevent="sortResultsRelevanceAsc" href="javascript:;"><feather-icon type="bar-chart"></feather-icon> Relevance 0%&rarr;100%</a>
                  <a class="dropdown-item dropdown-item-with-icon" @click.prevent="sortResultsRelevanceDesc" href="javascript:;"><feather-icon type="bar-chart-reverse"></feather-icon> Relevance 100%&rarr;0%</a>
                </div>
              </div>

              <div class="text-center ml-3">
                <a class="btn btn-secondary" v-if="searchResult.data.length == listOfSelected.length" @click.prevent="deselectAllTags">Deselect All</a>
                <a class="btn btn-secondary" v-else @click.prevent="selectAllTags">Select All</a>
              </div>
          </div>
          
          
          <div class="col-md-12">
              <div id="searchresults" class="row mt-5">

                <!-- searchresults-row header -->
<!--                 <div class="col-md-12 py-2 searchresults-row header">
                  <div class="d-flex align-items-center">
                    <div v-if="searchResult.data.length == listOfSelected.length" 
                         class="mr-auto"
                         style="width: 1.7rem; height: 1.7rem;" 
                         v-b-tooltip.hover.right title="Deselect All"
                         @click.prevent="deselectAllTags"
                         >
                      <feather-icon type="minus-square"></feather-icon>
                    </div>
                    <div v-else
                         class="mr-auto" 
                         style="width: 1.7rem; height: 1.7rem;" 
                         v-b-tooltip.hover.right title="Select All"
                         @click.prevent="selectAllTags"
                         >
                      <feather-icon type="plus-square"></feather-icon>
                    </div>

                    <div class="mr-4" style="height: 1.7rem;">
                      <div class="btn-group dropleft">
                        <a class="dropdown-toggle" href="#" role="button" :id="'moreHorizontal'+index" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                           <feather-icon type="copy"></feather-icon> 51
                        </a>
                        <div class="dropdown-menu">
                          <a class="dropdown-item disabled" href="javascript:;">
                            <span v-b-tooltip.hover.left title="Upgrade to access"><feather-icon type="lock" class="mr-2"></feather-icon>Save to Hashtag Groups</span>
                          </a>
                        </div>
                      </div>
                    </div>

                    <div style="width: 1.7rem; height: 1.7rem;">
                      <div class="btn-group dropleft">
                        <a class="dropdown-toggle" href="#" role="button" :id="'moreHorizontal'+index" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                           <feather-icon type="filter"></feather-icon>
                        </a>
                        <div class="dropdown-menu">
                          <a class="dropdown-item disabled" href="javascript:;">
                            <span v-b-tooltip.hover.left title="Upgrade to access"><feather-icon type="lock" class="mr-2"></feather-icon>Save to Hashtag Groups</span>
                          </a>
                        </div>
                      </div>
                    </div>

                  </div>
                </div>  -->

                <!-- searchresults-row -->
                <div class="col-md-12 py-2" v-for="(tag, index) in searchResult.data" :class="{ 'searchresults-row': true, 'tag-is-selected': tag.isSelected }">
                  <div class="d-flex align-items-center">

                    <div class="mr-5" style="width: 1.7rem; height: 1.7rem;" @click="tag.isSelected = !tag.isSelected">
                      <feather-icon v-if="!tag.isSelected" type="square"></feather-icon><feather-icon v-if="tag.isSelected" type="x-square"></feather-icon>
                    </div>

                    <div @click="tag.isSelected = !tag.isSelected" class="searchresults-tag pt-1 mr-auto">
                      <a href="javascript:;" :class="{'is-selected': tag.isSelected}">
                      <feather-icon type="hash"></feather-icon>{{tag.text}}</a>
                    </div>



                    <div style="width: 1.7rem; height: 1.7rem;">
                      <div class="btn-group dropleft">
                        <a class="dropdown-toggle" href="#" role="button" :id="'moreHorizontal'+index" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                           <feather-icon type="more-horizontal"></feather-icon>
                        </a>
                        <div class="dropdown-menu">
                          <!-- <h6 class="dropdown-header">#{{tag.text.toUpperCase()}}</h6> -->
                          <a class="dropdown-item dropdown-item-with-icon" @click.prevent="$router.push('/search/' + tag.text)" href="javascript:;">
                            <feather-icon type="search"></feather-icon>Search #{{tag.text}}
                          </a>
                          <a class="dropdown-item dropdown-item-with-icon" :href="'https://www.instagram.com/explore/tags/'+tag.text+'/'" target="_blank">
                            <feather-icon type="instagram"></feather-icon>#{{tag.text}} on Instagram
                          </a>
                          <div class="dropdown-divider"></div>
                          <!-- <span v-b-tooltip.hover title="Sign Up"><a class="dropdown-item dropdown-item-with-icon disabled" href="javascript:;"><feather-icon type="lock"></feather-icon><span style="color: transparent; text-shadow: 0 0 7px rgba(0,0,0,0.5);">12,345</span> posts</a></span> -->
                          <a class="dropdown-item dropdown-item-with-icon disabled" href="javascript:;">
                            <span v-b-tooltip.hover.left title="Coming soon"><feather-icon type="lock"></feather-icon>Post stats</span>
                          </a>
                          <a class="dropdown-item dropdown-item-with-icon disabled" href="javascript:;">
                            <span v-b-tooltip.hover.left title="Coming soon"><feather-icon type="lock"></feather-icon>Relevance score</span>
                          </a>
                          <a class="dropdown-item dropdown-item-with-icon disabled" href="javascript:;">
                            <span v-b-tooltip.hover.left title="Coming soon"><feather-icon type="lock"></feather-icon>Save to Hashtag Groups</span>
                          </a>
                        </div>
                      </div>
                    </div>
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
import feather from 'feather-icons'

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
    },

    isAllTagsSelected () {
      return this.searchResult.data.length - this.listOfSelected.length
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
            const originalSearchResult = [{ text: this.$route.params.tag, isSelected: true, count: 133713371337 }]
            const returnedSearchResult = res.data.data.map( o => {
              return { text: o.text, isSelected: false, count: o.count } 
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


    },

    selectAllTags () {
      this.searchResult.data = this.searchResult.data.map( o => {
        return { text: o.text, isSelected: true, count: o.count } 
      })
    },

    deselectAllTags () {
      this.searchResult.data = this.searchResult.data.map( o => {
        return { text: o.text, isSelected: false, count: o.count } 
      })
    },



    sortResultsHashtagAZ () {
      return this.searchResult.data.sort( (a,b) => {
        var x = a.text.toLowerCase();
        var y = b.text.toLowerCase();
        if (x < y) {return -1;}
        if (x > y) {return 1;}
        return 0;
      })
    },
    sortResultsHashtagZA () {
      return this.searchResult.data.sort( (a,b) => {
        var x = a.text.toLowerCase();
        var y = b.text.toLowerCase();
        if (x < y) {return 1;}
        if (x > y) {return -1;}
        return 0;
      })},
    sortResultsRelevanceAsc () {
      return this.searchResult.data.sort( (a,b) => {return a.count - b.count})},
    sortResultsRelevanceDesc () {
      return this.searchResult.data.sort( (a,b) => {return b.count - a.count})},
  }
}
</script>

<style scoped lang="sass">
.feather-hash, .feather-bar-chart, .feather-bar-chart-reverse, .feather-lock, .feather-search, .feather-instagram
  width: 1rem
  height: 1rem
  stroke: currentColor

.feather-square, .feather-x-square, .feather-more-horizontal, .feather-plus-square, .feather-minus-square, .feather-filter, .feather-copy
  width: 1.7rem
  height: 1.7rem
  stroke-width: 1.76px
  cursor: pointer


.dropdown-item.dropdown-item-with-icon
  padding-left: .7rem
  .feather
    margin-right: .7rem

.tag-is-selected
  background: #F8F9FA

.searchresults-row
  border-bottom: 2px solid #E9ECEF
  .dropdown-toggle::after, .dropdown-toggle::before
    display: none

  .options
    visibility: hidden

// .searchresults-tag:hover
//   .options
//     visibility: visible

button:focus
  outline: 0 !important


td
  vertical-align: baseline

</style>