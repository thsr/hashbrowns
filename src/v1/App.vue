<template>
<div>
  <main-header></main-header>
  <router-view></router-view>
  <vue-progress-bar></vue-progress-bar>
</div>
</template>





<script>
import MainHeader from '@/components/MainHeader.vue'

export default {
  name: 'app',
  components: {
    MainHeader
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

// @import url('https://fonts.googleapis.com/css?family=Karla:400,400i,700,700i');
// @import url('https://fonts.googleapis.com/css?family=Rubik:300,400,700,900');
// @import url('https://fonts.googleapis.com/css?family=Archivo+Black');
// @import url('https://fonts.googleapis.com/css?family=Source+Sans+Pro');
// @import url('https://fonts.googleapis.com/css?family=Asset');
// @import url('https://fonts.googleapis.com/css?family=Roboto:100,300,400,700,900');
// @import url('https://fonts.googleapis.com/css?family=Roboto+Mono:100,400,700');
// @import url('https://fonts.googleapis.com/css?family=Work+Sans:100,200,300,400,500,600,700,800,900');
// @import url('https://fonts.googleapis.com/css?family=League+Script');

@import url('./assets/maisonneue/stylesheet.css')


// ==============================
// =            mixins            =
// ==============================

@mixin vendor-prefix($name, $value)
  @each $vendor in ('-webkit-', '-moz-', '-ms-', '-o-', '') 
    #{$vendor}#{$name}: #{$value}
// usage: @include vendor-prefix('box-sizing', 'border-box')



// /*=============================*/
// =           bulma           =
// /*=============================*/
@import "../node_modules/bulma/sass/utilities/_all"

////////////////////////////////////////////////
////////////////////////////////////////////////
// 1. Initial variables

// Colors
$black:        hsl(0, 0%, 4%)
$black-bis:    hsl(0, 0%, 7%)
$black-ter:    hsl(0, 0%, 14%)

$grey-darker:  hsl(0, 0%, 21%)
$grey-dark:    hsl(0, 0%, 29%)
$grey:         hsl(0, 0%, 48%)
$grey-light:   hsl(0, 0%, 71%)
$grey-lighter: hsl(0, 0%, 86%)

$white-ter:    hsl(0, 0%, 96%)
$white-bis:    hsl(0, 0%, 98%)
$white:        hsl(0, 0%, 100%)

$orange:       hsl(14,  100%, 53%)
$yellow:       hsl(48,  100%, 67%)
$green:        hsl(141, 71%,  48%)
$turquoise:    hsl(171, 100%, 41%)
$blue:         hsl(217, 71%,  53%)
$purple:       hsl(271, 100%, 71%)
$red:          hsl(348, 100%, 61%)

// Typography
$family-sans-serif: "Maison Neue", BlinkMacSystemFont, -apple-system, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", "Helvetica", "Arial", sans-serif
$family-monospace: "Maison Mono", monospace
$render-mode: optimizeLegibility

$size-1: 3rem
$size-2: 2.5rem
$size-3: 2rem
$size-4: 1.5rem
$size-5: 1.25rem
$size-6: 1rem
$size-7: 0.75rem

$weight-light: 300
$weight-normal: 400
$weight-semibold: 500
$weight-bold: 700

// Body
$body-background: #fff
$body-size: 14px

// Responsiveness
// 960, 1152, and 1344 have been chosen because they are divisible by both 12 and 16
$tablet: 769px
// 960px container + 40px
$desktop: 1000px
// 1152px container + 40
$widescreen: 1192px
// 1344px container + 40
$fullhd: 1384px

// Miscellaneous
$easing: ease-out
$radius-small: 2px
$radius: 3px
$radius-large: 5px
$speed: 86ms

////////////////////////////////////////////////
////////////////////////////////////////////////
// 2. Primary colors

$primary: #555

$info: $blue
$success: $green
$warning: $yellow
$danger: $red

$light: $white-ter
$dark: $grey-darker

////////////////////////////////////////////////
////////////////////////////////////////////////
// 3. Applied variables

// Invert colors
$orange-invert: findColorInvert($orange)
$yellow-invert: findColorInvert($yellow)
$green-invert: findColorInvert($green)
$turquoise-invert: findColorInvert($turquoise)
$blue-invert: findColorInvert($blue)
$purple-invert: findColorInvert($purple)
$red-invert: findColorInvert($red)

$primary-invert: $turquoise-invert
$info-invert: $blue-invert
$success-invert: $green-invert
$warning-invert: $yellow-invert
$danger-invert: $red-invert
$light-invert: $dark
$dark-invert: $light

// General colors
$background: $white-ter

$border: $grey-lighter
$border-hover: $grey-light

// Text colors
$text: #555
$text-invert: findColorInvert($text)
$text-light: $grey
$text-strong: $grey-darker

// Code colors
$code: $red
$code-background: $background

$pre: $text
$pre-background: $background

// Link colors
$link: $text
$link-invert: $text
$link-visited: $text
$link-hover: #000
$link-hover-border: #000
$link-focus: #000
$link-focus-border: #000
$link-active: #000
$link-active-border: #000

// Typography
$family-primary: $family-sans-serif
$family-code: $family-monospace

$size-small: $size-7
$size-normal: $size-6
$size-medium: $size-5
$size-large: $size-4

////////////////////////////////////////////////
////////////////////////////////////////////////
// 4. Lists and maps

$colors: ("white": ($white, $black), "black": ($black, $white), "light": ($light, $light-invert), "dark": ($dark, $dark-invert), "primary": ($primary, $primary-invert), "info": ($info, $info-invert), "success": ($success, $success-invert), "warning": ($warning, $warning-invert), "danger": ($danger, $danger-invert))

$sizes: $size-1 $size-2 $size-3 $size-4 $size-5 $size-6 $size-7


@import "../node_modules/bulma/bulma.sass"

// /*===============================*/
// =           general           =
// /*===============================*/

body, button, input, select, textarea, h1, h2
  font-weight: 400

.is-weight-light
  font-weight: $weight-light
.is-weight-normal
  font-weight: $weight-normal
.is-weight-semibold
  font-weight: $weight-semibold
.is-weight-bold
  font-weight: $weight-bold
.is-text-large
  font-size: $size-large

// /*==================================*/
// =           components           =
// /*==================================*/

.container
  padding: 0.75em

#main-header-c
  position: relative
  z-index: 99
  top: 0
  left: 0
  width: 100vw  
  .logo1
    font-weight: 900
  .logo2
    font-weight: 300
  .menu
    font-weight: 700
  ul
    margin: 0
    li
      display: inline-block
      border-bottom: 2px solid transparent
      &:first-child
        margin-right: 1em
      &.router-link-exact-active
        border-bottom: 2px solid #333

#search-c
  h1
    font-weight: 300
    background: linear-gradient(-45deg, #b721ff, #21d4fd, #2af598)
    @include vendor-prefix('background-clip', 'text')
    @include vendor-prefix('text-fill-color', 'transparent')
  h2
    margin: 0 0 1em 0

#search-results-c
  #taglist
    text-align: center
    font-size: 1.2em
    a:hover
      color: $text
    ul
      margin: 0
      li
        margin: 0 2em 1em 0
        display: inline-block
        border-bottom: 2px solid transparent
        // &:after
        //   color:#ddd
        //   content: "—"
        &.selected
          border-bottom: 2px solid $text
      &.error
        li
          word-break: break-all
    .control
      margin: 0 1em 1em 0
      display: inline-block

  #resultcontrols
    font-weight: 700
    ul
      margin: 0
      li
        margin: 0 1em 1em 0
        display: inline-block
        border-bottom: 2px solid transparent
        &.selected
          border-bottom: 2px solid $text


#search-field-c
  padding-top: 3em
  input
    background-color:rgba(255,255,255,1)
    /*border-radius: 5px;*/
    border: 0
    box-shadow: 0px 10px 51px 0px rgba(0,0,0,0.15)
  #login-prompt
    font-weight: 700

#about-c
  .hero
    a
      border-bottom: 2px solid $link
      &:hover
        border-bottom: 2px solid $link-hover

#privacy-c
  h1, h2
    font-weight: 300

.fade-enter-active, .fade-leave-active
  transition: opacity .2s

.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */
  opacity: 0





</style>
