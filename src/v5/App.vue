<template>
<div id="my-app">

<!-- 
        <div class="container-fluid fixed-top"> -->
<nav class="navbar navbar-expand-lg navbar-light" style="background: transparent;">
    <a class="navbar-brand" href="#"><span class="logo1">hashbrowns</span><span class="logo2">.cc</span></a>
    <button class="navbar-toggler border-0" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse justify-content-md-end" id="navbarNav">
        <ul class="navbar-nav">
            <li class="nav-item active">
                <a class="nav-link" href="#">Search</a>
            </li>
            <li class="nav-item">
                <a class="nav-link" href="#">About</a>
            </li>
        </ul>
    </div>
</nav>
        <!-- </div> -->

<!-- <div class="container container-full-page">
    <div class="row align-items-center justify-content-center">
        <div class="col-md-6 text-center">
            <h1 class="display-5">We serve hashtags for breakfast </h1>
            <p class="lead">
                Find popular related&nbsp;hashtags.
                <br> Get more&nbsp;followers. More&nbsp;likes. More&nbsp;better.
            </p>

            <div class="input-group input-group-lg my-5 hashtagSearch">
                <div class="input-group-prepend">
                    <span class="input-group-text bg-white border-right-0" id="hashtagSearch"><i class="fa fa-hashtag" aria-hidden="true"></i></span>
                </div>
                <input type="text" class="form-control border-left-0" placeholder="TypeYourHashtag" aria-label="TypeYourHashtag" aria-describedby="hashtagSearch">
            </div>

        </div>
    </div>
</div> -->




        <!-- <div class="container container-regular-page">
  <div class="row align-items-center justify-content-center">

    <div class="col-md-12">

            <p>Hi,</p>
            <p>Hashbrowns.cc is a spare time project to learn Javascript using <a href="https://nodejs.org/" target="_blank">Node.js</a>, <a href="https://expressjs.com/" target="_blank">Express</a> and <a href="https://vuejs.org/" target="_blank">Vue.js</a>. My girlfriend needed an Instagram scheduling tool, so naturally I ended up building an Instagram hashtag finder (wat?).</p>
            <p>The algorithm looks for popular hashtags used on Instagram in posts tagged with your searched hashtag.</p>
            <p>Inquiries <a href="mailto:theodore.sorokine@gmail.com">here</a>.</p>
            <p>&nbsp;</p>

            <p>TODO:</p>
            <p>
              &rarr; Ability to login and save hashtag groups
            </p>
            <p>
              &rarr; Ability to manage and categorise hashtag groups
            </p>
            <p>
              &rarr; Build the actual Instagram scheduling tool
            </p>
            <p>&nbsp;</p>
            <p><router-link href="javascript:;" :to="{ path: '/privacy' }">Privacy policy</router-link></p>
      
    </div>

  </div>

</div> -->

<div class="container container-regular-page my-5">
    <div class="row align-items-top justify-content-left">

        <div class="col-md-6 offset-md-3 text-center">
            <div id="searchfield" class="mb-5">
                <i class="fa fa-hashtag text-lg" aria-hidden="true"></i>
                <b-form-input id="inputLive" v-model.trim="name" type="text" size="lg" :state="nameState" aria-describedby="inputLiveFeeback" placeholder="TypeYourHashtag"></b-form-input>
                <b-form-invalid-feedback id="inputLiveFeedback">
                    <!-- This will only be shown if the preceeding input has an invalid state -->
                    Enter at least 3 letters
                </b-form-invalid-feedback>
            </div>
        </div>

        <div class="w-100 mt-5"></div>

        <!-- <div class="col-md-12 col-selected-tags sticky-top">
            <div class="card mt-3 mt-md-5">
                <div class="card-body">
                    <p class="card-text">#fitness #motivation #goals #workout #weightloss #fit #gym #fitfam #gymlife #health #nutrition #bodybuilding #fitspo #healthy #personaltrainer #progress #transformation #herbalife #inspiration #lifestyle #abs #fitnessmotivation #fitmom #transformationtuesday #training #exercise #instafit #muscle #newyear #success #noexcuses #gains #diet #work #getfit #healthylifestyle #eatclean #business #2018 #fitnessjourney #love #hardwork #energy #squats #crossfit #sport #strength #dedication #bootcamp #life</p>
                    <a href="#" class="btn btn-primary">Copy to clipboard</a>
                </div>
            </div>
        </div> -->

        <div class="col-md-12 text-center">
            <div class="text-center mt-5">
              <b-btn id="tooltipButton-1" @click="show = !show" variant="primary">Copy selection (5) to clipboard</b-btn>
              <b-tooltip disabled :show.sync="show" target="tooltipButton-1" placement="top" delay="1">Copied!</b-tooltip>
            </div>
        </div>


        <div class="col-md-12">
            <div id="searchresults" class="row mt-5 align-items-center">
                <div class="col-6 col-md-4 text-center my-2 searchresults-tag" v-for="(tag, index) in tags">
                  <a href="javascript:;" class="pb-1">#{{tag}}</a>
                </div>
              </div>
        </div>

    </div>
</div>

</div>
</template>
<script>
import MainHeader from '@/components/MainHeader.vue'

export default {
  name: 'app',
  data () {
    return {
      show: true,
      name: '',
      tags: ["food", "foodporn", "yummy", "foodie", "dinner", "cook", "instafood", "chef", "foodstagram", "delicious", "instagood", "repost", "foodgasm", "healthyfood", "foodlover", "follow4follow", "foodpics", "homemade", "foodphotography", "selfie", "photographyphotographyphotography", "ps4", "love", "model", "healthy", "bodybuilding"]
    };
  },
  methods: {
    randomNumber: function () {
      return Math.floor(Math.random() * (1000 - 1 + 1)) + 1
    }
  },
  components: {
    MainHeader
  },
  computed: {
    nameState () {
      return this.name.length > 2 || this.name == '' ? null : false
    }
  },
  
  /*----------  vue-progress-bar stuff  ----------*/
  mounted () {
    //  [App.vue specific] When App.vue is finish loading finish the progress bar
    if (this.$route.name !== 'SearchResults2') {
      //  start the progress bar
      this.$Progress.finish()
    }
  },
  created () {
    //  [App.vue specific] When App.vue is first loaded start the progress bar
    this.$Progress.start()
    
    //  hook the progress bar to start before we move router-view
    this.$router.beforeEach((to, from, next) => {
      //  does the page we want to go to have a meta.progress object
      if (to.meta.progress !== undefined) {
        let meta = to.meta.progress
        // parse meta tags
        this.$Progress.parseMeta(meta)
      }

      if (to.name !== 'SearchResults') {
        //  start the progress bar
        this.$Progress.start()
      }

      //  continue to next page
      next()
    })
    //  hook the progress bar to finish after we've finished moving router-view
    this.$router.afterEach((to, from) => {
      //  finish the progress bar
      if (to.name !== 'SearchResults') {
        //  start the progress bar
        this.$Progress.finish()
      }
    })
  }
  /*----------  end vue-progress-bar stuff  ----------*/
}
</script>




<style lang="sass">
// /*=============================*/
// =           fonts           =
// /*=============================*/

@import url('./assets/maisonneue/stylesheet.css')

// ==============================================
// =            mixins and variables           =
// =============================================

$font-family-sans-serif: "Maison Neue", BlinkMacSystemFont, -apple-system, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", "Helvetica", "Arial", sans-serif
$family-monospace: "Maison Mono", monospace
$render-mode: optimizeLegibility

$primary: #6685f9
$primary: #666
$secondary: #ddd

$black: #000
$verydark: #222
$dark: #444
$verymedium: #666
$medium: #aaa
$light: #ddd
$verylight: #eee

$body-background-color: #fff
$line-height-base: 1.4
$font-size-base: .92rem
// $body-size-mobile: 12px

$input-btn-focus-width: 0
$input-focus-border-color: #ced4da


=vendor-prefix($name, $value)
  @each $vendor in ('-webkit-', '-moz-', '-ms-', '-o-', '') 
    #{$vendor}#{$name}: #{$value}
// usage: @include vendor-prefix('box-sizing', 'border-box')

=from($device)
  @media screen and (min-width: $device)
    @content

=until($device)
  @media screen and (max-width: $device - 1px)
    @content

=keyframes($name)
  @-webkit-keyframes #{$name}
    @content
  @-moz-keyframes #{$name}
    @content
  @-ms-keyframes #{$name}
    @content
  @keyframes #{$name}
    @content

// ==============================
// =            reset            =
// ==============================

@import './../node_modules/bootstrap/scss/bootstrap'

@import './../node_modules/bootstrap-vue/dist/bootstrap-vue.css'

// ==============================
// =            general            =
// ==============================



html
  background-color: #fff
  min-width: 300px
  overflow-x: hidden
  overflow-y: scroll
  text-rendering: $render-mode


html, body
  +until(767px)
    font-size: ($font-size-base * .9)
  +from(767px)
    font-size: $font-size-base
a
  color: $dark

p a
  text-decoration: underline

a:hover
  color: $black

h1.display-5
  background: linear-gradient(-45deg, #b721ff, #21d4fd, #2af598)
  +vendor-prefix('background-clip', 'text')
  +vendor-prefix('text-fill-color', 'transparent')

.btn-brand-colours
  background: linear-gradient(0deg, #b721ff, #21d4fd, #2af598)

.navbar-brand
  font-size: 1rem
  .logo1
    font-weight: 900
  .logo2
    font-weight: 300

.container-menu-bar
  position: relative
  top: 0

.hashtagSearch
  border: 0
  box-shadow: 0px 10px 51px 0px rgba(0,0,0,0.15)


// .col-selected-tags
//   +until(767px)
//     position: fixed
//     bottom: 3rem

.col-selected-tags
  .card
    position: sticky
    top: 3rem

// .col-selected-tags
//   .card
//     top: 3rem

.container-full-page
  .row
    height: calc(100vh - 10rem)

.container-regular-page

.toolscolumn
  .btn, .dropdown-item
    font-size: .875rem 

tr
  vertical-align: baseline

.table th 
  border-top: 0

#searchfield
  text-align: left
  font-size: $font-size-lg
  .invalid-feedback
    display: block
    visibility: hidden
  .is-invalid+.invalid-feedback
    visibility: visible
  i
    position: absolute
    margin: .8rem
    width: 1rem
    color: $input-placeholder-color
  input
    padding-left: 3.5rem
    box-shadow: 0px 10px 51px 0px rgba(0,0,0,0.15)

#searchresults
  font-size: ($font-size-base * 1.3)
  .searchresults-tag
    // white-space: nowrap
    // overflow: hidden
    // text-overflow: ellipsis
    overflow-wrap: break-word
    a
      color: $body-color
    a.is-selected
      border-bottom: 2px solid $body-color
    a:hover
      color: $body-color
      text-decoration: none



</style>