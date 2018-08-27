<template>



<div class="container container-regular-page my-5">
    <div class="row align-items-top justify-content-left">

        <div class="col-md-6 offset-md-3 text-center">
            <search-field :searchedHashtag="$route.params.tag" class="mb-5"></search-field>
        </div>

        <div class="w-100"></div>

        <div v-if="loading" class="col-12 text-center">
            <i class="fa fa-circle-o-notch fa-spin fa-2x"></i>
        </div>

        <div v-if="error" class="col-12 text-center">
          {{error}}
        </div>

        <div v-if="searchResult.data.length > 0" class="col-md-6 justify-content-center mb-4">

          <div v-if="listOfSelected.length < 1" class="text-center">
            <button type="button" class="btn btn-primary" disabled>Select tags to copy to clipboard</button>
          </div>

          <div v-else-if="listOfSelected.length > 0" class="text-center">
            <b-btn id="copySelected" v-clipboard:copy="listOfSelectedCopiable" v-clipboard:success="onCopy" variant="primary">Copy selection ({{listOfSelected.length}}) to clipboard</b-btn>
            <b-tooltip disabled :show.sync="isCopied" target="copySelected" placement="top">Copied!</b-tooltip>
          </div>

        </div>

        <div v-if="searchResult.data.length > 0" class="col-md-6 justify-content-center d-flex mb-3">
          <div class="mr-3">
            <a class="btn btn-secondary" v-if="searchResult.data.length == listOfSelected.length" @click.prevent="deselectAllTags">Deselect All</a>
            <a class="btn btn-secondary" v-else @click.prevent="selectAllTags">Select All</a>
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
        </div>
          
          
          <div id="searchresults" v-if="searchResult.data.length > 0" class="col-md-12 mt-5">

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

                    <!-- <transition name="fade-slide-y">
                      <div v-if="tag.displayTest" class="pt-1 mr-5">
                        <span v-b-tooltip.hover title="Instagram posts">{{tag.displayTest}}</span>
                      </div>
                    </transition> -->

                    <div style="width: 1.7rem; height: 1.7rem;">
                      <div class="btn-group dropleft">
                        <a class="dropdown-toggle" href="#" role="button" :id="'moreHorizontal'+index" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                           <feather-icon type="more-horizontal"></feather-icon>
                        </a>

                        
                        <div class="dropdown-menu">
                          <!-- <h6 class="dropdown-header">#{{tag.text.toUpperCase()}}</h6> -->
                          <a v-if="tag.text != $route.params.tag" class="dropdown-item dropdown-item-with-icon" @click.prevent="$router.push('/search/' + tag.text)" :href="'/search/' + tag.text">
                            <feather-icon type="search"></feather-icon>Search #{{tag.text}}
                          </a>
                          <a class="dropdown-item dropdown-item-with-icon" :href="'https://www.instagram.com/explore/tags/'+tag.text+'/'" target="_blank">
                            <feather-icon type="instagram"></feather-icon>#{{tag.text}} on Instagram
                          </a>
                          <!-- <span v-b-tooltip.hover title="Sign Up"><a class="dropdown-item dropdown-item-with-icon disabled" href="javascript:;"><feather-icon type="lock"></feather-icon><span style="color: transparent; text-shadow: 0 0 7px rgba(0,0,0,0.5);">12,345</span> posts</a></span> -->
                          <!-- <div class="dropdown-divider"></div>
                          <a class="dropdown-item dropdown-item-with-icon disabled" href="javascript:;">
                            <span v-b-tooltip.hover.left title="Coming soon"><feather-icon type="lock"></feather-icon>Post stats</span>
                          </a>
                          <a class="dropdown-item dropdown-item-with-icon disabled" href="javascript:;">
                            <span v-b-tooltip.hover.left title="Coming soon"><feather-icon type="lock"></feather-icon>Relevance score</span>
                          </a>
                          <a class="dropdown-item dropdown-item-with-icon disabled" href="javascript:;">
                            <span v-b-tooltip.hover.left title="Coming soon"><feather-icon type="lock"></feather-icon>Save to Hashtag Groups</span>
                          </a> -->
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
      error: '',
      isCopied: false,
      //tmp
      show: true
    }
  },

  mounted () {
    this.fetchData()
  },

  watch: {
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
        this.throwError('Hashtags can\'t have special characters :(')
        return
      } else {
        this.error = null
        this.searchResult = {data: []}
        this.loading = true
        this.$Progress.start()

        const startTime = new Date()

        const endpoint = process.env.HB_ENDPOINT + '/search/' + this.$route.params.tag

        /*localhost test*/
        // if (this.$route.params.tag == 'producthunt') {
        //   setTimeout( () => {
        //       this.loading = false
        //       this.$Progress.finish()
        //       this.searchResult.data = [{"text":"producthunt","isSelected":true,"count":133713371337},{"text":"startup","isSelected":false,"count":21},{"text":"tech","isSelected":false,"count":14},{"text":"startups","isSelected":false,"count":11},{"text":"entrepreneur","isSelected":false,"count":10},{"text":"israel","isSelected":false,"count":6},{"text":"business","isSelected":false,"count":6},{"text":"kickstarter","isSelected":false,"count":6},{"text":"robots","isSelected":false,"count":5},{"text":"marketing","isSelected":false,"count":4},{"text":"telaviv","isSelected":false,"count":4},{"text":"innovation","isSelected":false,"count":4},{"text":"reprap","isSelected":false,"count":4},{"text":"motor","isSelected":false,"count":4},{"text":"design","isSelected":false,"count":4},{"text":"stem","isSelected":false,"count":4},{"text":"canada","isSelected":false,"count":4},{"text":"burlon","isSelected":false,"count":4},{"text":"apps","isSelected":false,"count":4},{"text":"mcmaster","isSelected":false,"count":4},{"text":"hamont","isSelected":false,"count":4},{"text":"notskynet","isSelected":false,"count":4},{"text":"mechanics","isSelected":false,"count":4},{"text":"3dprinter","isSelected":false,"count":4},{"text":"3d","isSelected":false,"count":4},{"text":"raspberrypi","isSelected":false,"count":4},{"text":"motordriver","isSelected":false,"count":4},{"text":"raspberry","isSelected":false,"count":4},{"text":"school","isSelected":false,"count":4},{"text":"education","isSelected":false,"count":4},{"text":"teachers","isSelected":false,"count":4},{"text":"3dprinting","isSelected":false,"count":4},{"text":"robotics","isSelected":false,"count":4},{"text":"robot","isSelected":false,"count":4},{"text":"3dprinted","isSelected":false,"count":4},{"text":"roboteurs","isSelected":false,"count":4},{"text":"dallas","isSelected":false,"count":3},{"text":"staffpick","isSelected":false,"count":3},{"text":"technology","isSelected":false,"count":3},{"text":"wework","isSelected":false,"count":3},{"text":"apple","isSelected":false,"count":3},{"text":"product","isSelected":false,"count":3},{"text":"startupnation","isSelected":false,"count":3}]
        //   }, 400)

        //   return
        // } else if (this.$route.params.tag == 'startup') {
        //     setTimeout( () => {
        //       this.loading = false
        //       this.$Progress.finish()
        //       this.searchResult.data = [{"text":"startup","isSelected":true,"count":133713371337},{"text":"business","isSelected":false,"count":19},{"text":"entrepreneur","isSelected":false,"count":17},{"text":"innovation","isSelected":false,"count":11},{"text":"tech","isSelected":false,"count":10},{"text":"nyc","isSelected":false,"count":7},{"text":"graphicdesign","isSelected":false,"count":6},{"text":"startuplife","isSelected":false,"count":6},{"text":"funding","isSelected":false,"count":5},{"text":"competition","isSelected":false,"count":5},{"text":"inspiration","isSelected":false,"count":5},{"text":"startups","isSelected":false,"count":5},{"text":"creative","isSelected":false,"count":5},{"text":"leadership","isSelected":false,"count":5},{"text":"instagood","isSelected":false,"count":5},{"text":"work","isSelected":false,"count":5},{"text":"new","isSelected":false,"count":4},{"text":"imaginecup","isSelected":false,"count":4},{"text":"ux","isSelected":false,"count":4},{"text":"fashion","isSelected":false,"count":4},{"text":"motivation","isSelected":false,"count":4},{"text":"intilaq","isSelected":false,"count":4},{"text":"quotes","isSelected":false,"count":4},{"text":"certificate","isSelected":false,"count":4},{"text":"hub","isSelected":false,"count":4},{"text":"design","isSelected":false,"count":4},{"text":"challenge","isSelected":false,"count":4},{"text":"photooftheday","isSelected":false,"count":4},{"text":"ideas","isSelected":false,"count":4},{"text":"travel","isSelected":false,"count":4},{"text":"life","isSelected":false,"count":4},{"text":"cowork","isSelected":false,"count":4},{"text":"technology","isSelected":false,"count":4},{"text":"training","isSelected":false,"count":4},{"text":"entrepreneurship","isSelected":false,"count":3},{"text":"success","isSelected":false,"count":3},{"text":"concert","isSelected":false,"count":3},{"text":"madeinfrance","isSelected":false,"count":3},{"text":"brooklyn","isSelected":false,"count":3},{"text":"hightech","isSelected":false,"count":3},{"text":"picoftheday","isSelected":false,"count":3},{"text":"manhattan","isSelected":false,"count":3},{"text":"lifestyle","isSelected":false,"count":3},{"text":"pitch","isSelected":false,"count":3},{"text":"advice","isSelected":false,"count":3},{"text":"architecture","isSelected":false,"count":3},{"text":"branding","isSelected":false,"count":3},{"text":"designer","isSelected":false,"count":3},{"text":"marketing","isSelected":false,"count":3},{"text":"logo","isSelected":false,"count":3},{"text":"future","isSelected":false,"count":3}]
        //   }, 400)

        //   return
        // }
        /*localhost test*/

        axios.get(endpoint)
        .then( (res) => {
          this.loading = false
          this.$Progress.finish()

          if (res.data.data.length == 0) {
            this.throwError('No hashtags found :(')
          } else {
            const originalSearchResult = [{ text: this.$route.params.tag, isSelected: true, count: 133713371337 }]
            const returnedSearchResult = res.data.data.map( o => {
              return { text: o.text, isSelected: false, count: o.count } 
            })
            this.searchResult.data = originalSearchResult.concat(returnedSearchResult)
          }

          const endTime = new Date()
          const elapsedTime = endTime - startTime

          if (!localStorage.getItem("hb_maincomponent")) localStorage.setItem("hb_maincomponent", 1)
          else if (localStorage.getItem("hb_maincomponent")) localStorage.setItem("hb_maincomponent", Number(localStorage.getItem("hb_maincomponent")) + 1)

          dataLayer.push({
            event: 'hashtag_search',
            tag_name: this.$route.params.tag,
            nb_results: res.data.data.length.toString(),
            query_time: elapsedTime
            
          })
        })
        .catch( (error) => {
          this.loading = false
          this.$Progress.finish()
          this.throwError(error.response.data)

          dataLayer.push({
            event: 'hashtag_search_error',
            tag_name: this.$route.params.tag,
            error_message: error.response.data.toString()
            
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
      dataLayer.push({
        event: 'hashtag_search_select_all',
        tag_name: this.$route.params.tag
      })
      this.searchResult.data = this.searchResult.data.map( o => {
        return { text: o.text, isSelected: true, count: o.count } 
      })
    },

    deselectAllTags () {
      dataLayer.push({
        event: 'hashtag_search_deselect_all',
        tag_name: this.$route.params.tag
      })
      this.searchResult.data = this.searchResult.data.map( o => {
        return { text: o.text, isSelected: false, count: o.count } 
      })
    },

    sortResultsHashtagAZ () {
      dataLayer.push({
        event: 'hashtag_search_sort_hashtag_az',
        tag_name: this.$route.params.tag
      })
      return this.searchResult.data.sort( (a,b) => {
        var x = a.text.toLowerCase();
        var y = b.text.toLowerCase();
        if (x < y) {return -1;}
        if (x > y) {return 1;}
        return 0;
      })
    },

    sortResultsHashtagZA () {
      dataLayer.push({
        event: 'hashtag_search_sort_hashtag_za',
        tag_name: this.$route.params.tag
      })
      return this.searchResult.data.sort( (a,b) => {
        var x = a.text.toLowerCase();
        var y = b.text.toLowerCase();
        if (x < y) {return 1;}
        if (x > y) {return -1;}
        return 0;
      })
    },

    sortResultsRelevanceAsc () {
      dataLayer.push({
        event: 'hashtag_search_sort_relevance_asc',
        tag_name: this.$route.params.tag
      })
      return this.searchResult.data.sort( (a,b) => {return a.count - b.count})
    },

    sortResultsRelevanceDesc () {
      dataLayer.push({
        event: 'hashtag_search_sort_relevance_desc',
        tag_name: this.$route.params.tag
      })
      return this.searchResult.data.sort( (a,b) => {return b.count - a.count})
    }
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
  background: #ecf0f4

.searchresults-row
  border-bottom: 2px solid #e0e3e6
  .dropdown-toggle::after, .dropdown-toggle::before
    display: none
  .options
    visibility: hidden

button:focus
  outline: 0 !important


td
  vertical-align: baseline

</style>