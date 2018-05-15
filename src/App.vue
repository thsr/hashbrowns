<template>
<div>
  <main-header></main-header>
  <transition name="fade-slide-y" mode="out-in" appear>
    <router-view :key="$route.params.tag"></router-view>
  </transition>
  <vue-progress-bar></vue-progress-bar>
</div>
</template>



<script>
import MainHeader from '@/components/MainHeader.vue'
import vueprogressbar from '@/js/vueprogressbar'

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
  
  ...vueprogressbar
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

// $primary: #6685f9
$primary: #666
// $primary: #2C7AB9
$secondary: #ddd
// $secondary: #C7E0EC

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
$line-height: 1.7
$line-height-lg: 1.7
$line-height-sm: 1.7

$input-btn-focus-width: 0
$input-focus-border-color: $medium


$border-radius: .33rem




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
.feather
  stroke: currentColor
  stroke-width: 3px

.fade-slide-y-enter-active, .fade-slide-y-leave-active
  transition: all .2s

.fade-slide-y-enter, .fade-slide-y-leave-to
  opacity: 0
  transform: translateY(10px)

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

h1.display-5.hero
  background: linear-gradient(-45deg, #b721ff, #21d4fd, #2af598)
  // background: linear-gradient(-45deg, #F2E9D9, #C7E0EC, #227FC0, #FC5E5E)
  // background: linear-gradient(-45deg, #C7E0EC, #227FC0, #FC5E5E)
  +vendor-prefix('background-clip', 'text')
  +vendor-prefix('text-fill-color', 'transparent')

.btn-brand-colours
  background: linear-gradient(-45deg, #b721ff, #21d4fd, #2af598)

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

.col-selected-tags
  .card
    position: sticky
    top: 3rem

.container-full-page
  .row
    height: calc(100vh - 10rem)

.container-regular-page

.toolscolumn
  .btn, .dropdown-item
    font-size: .875rem 

#searchfield
  text-align: left
  font-size: $font-size-lg
  .invalid-feedback
    display: block
    visibility: hidden
  .invalid-feedback-visible
    visibility: visible
  .feather-hash
    position: absolute
    width: 1.5rem
    height: 1.5rem
    margin: .8rem 1.3rem
    stroke: $input-placeholder-color
    stroke-width: 2px
    z-index: 99
  .feather-search
    stroke: currentColor
    padding-top: .3rem
  input
    padding-left: 3.5rem
    border-radius: $border-radius 0 0 $border-radius
  .input-group
    border-radius: $border-radius
    box-shadow: 0px 10px 51px 0px rgba(0,0,0,0.15)
  button
    border-radius: 0 $border-radius $border-radius 0
    border-left: 0

.searchresults-row
  font-size: ($font-size-base * 1.1)
  // &:not(.header):hover  
  //   +from(767px)
  //     background: #fcfcff
  .searchresults-tag
    white-space: nowrap
    overflow: hidden
    text-overflow: ellipsis
    overflow-wrap: break-word
    a
      color: $body-color
      padding: 0
      border-bottom: 0
    a.is-selected
      border-bottom: 0
    a:hover
      color: $body-color
      text-decoration: none

nav
  z-index: 99


</style>