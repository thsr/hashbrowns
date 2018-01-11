<template>
<div id="my-app">


<div class="main">
  <div class="container-tight menu">
    <a href="javascript:;"><span class="logo1">hashbrowns</span><span class="logo2">.cc</span></a>
  </div>

  <div class="container-tight search">
    <div class="input">
      <input type="text" placeholder="tuna">
      <i class="fa"><svg xmlns="http://www.w3.org/2000/svg" width="0.66667em" height="1em" viewBox="0 0 20 30" style=""><path id="" style="stroke:currentColor; stroke-width:3; fill:transparent;" d="M 6 0 v 30  M 14 0 v 30  M 0 11 h 20  M 0 19 h 20"></path></svg></i>
    </div>
  </div>

<!--<div class="container-tight">
  <div class="clipboard">
    <div class="clipboard-content">
      <!-- <div class="controls">
        <a href="javascript:;" class="btn">select all</a>
      </div>
      <div class="list">
        #tuna #food #instafood #foodporn #fish #healthyfood #dinner #lunch #foodie #catsofinstagram #healthy #kitty #cats #cat #cute #salad #delicious #catlady #furbaby #silverbengal #bengalcute #atun #kittensofinstagram #purrfect #catsofig #cutecat #bengalcat #catstagram #catsofinsta #meowdel #meow #bestmeow #crazycatlady #tasty #fishing #tonno #instakittens #tunasalad #ig_bengals #caturday #tartare #instacat #kittycat #healthylife #sea #cleaneating #eatclean #love #homemade #pesce
      </div>
    </div>
  </div>
</div> -->

  <div class="container-tight results-controls">
    <p>
      <a href="javascript:;" class="btn">select all</a>
    </p>
    <p>
      <a href="javascript:;" class="btn">order alphabetically</a>
    </p>
  </div>  

  <div class="container-tight results"> 
  
    <div class="tagandoptions">
      <div class="tag">comonitstoolosldknfskldfnslkdfnngthistag</div>
      <div class="options">
        <div class="option"><a href="javascript:;">ig</a></div>
        <div class="option"><a href="javascript:;">s</a></div>
      </div>
    </div>
  
    <div class="tagandoptions selected">
      <div class="tag">HASHBROWNS sfghdg</div>
      <div class="options">
        <div class="option"><a href="javascript:;">ig</a></div>
        <div class="option"><a href="javascript:;">s</a></div>
      </div>
    </div>    
  
    <div class="tagandoptions selected">
      <div class="tag">comonitstoolosldknfskldfnslkdfnngthistag</div>
      <div class="options">
        <div class="option"><a href="javascript:;">ig</a></div>
        <div class="option"><a href="javascript:;">s</a></div>
      </div>
    </div>
  
    <div v-for="tag in tags" class="tagandoptions">
      <div class="tag">{{tag}}</div>
      <div class="options">
        <div class="option"><a href="javascript:;">ig</a></div>
        <div class="option"><a href="javascript:;">s</a></div>
      </div>
    </div>   
  
  </div>

  <div class="container-tight results-info">
    <p><span class="action">shift + click</span><span class="description">select multiple</span></p>
    <p><span class="action">ig</span><span class="description">lookup on instagram</span></p>
    <p><span class="action">s</span><span class="description">make a new search with selected hashtag</span></p>
  </div>  
</div>


<div class="clipboard">
  <div class="container-tight">
     <div class="wavedivider"></div>
     <div class="clipboard-content">#tuna #food #instafood #foodporn #fish #healthyfood #dinner #lunch #foodie #catsofinstagram #healthy #kitty #cats #cat #cute #salad #delicious #catlady #furbaby #silverbengal #bengalcute #atun #kittensofinstagram #purrfect #catsofig #cutecat #bengalcat #catstagram #catsofinsta #meowdel #meow #bestmeow #crazycatlady #tasty #fishing #tonno #instakittens #tunasalad #ig_bengals #caturday #tartare #instacat #kittycat #healthylife #sea #cleaneating #eatclean #love #homemade #pesce</div>
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
      tags: ["food", "foodporn", "yummy", "foodie", "dinner", "cook", "instafood", "chef", "foodstagram", "delicious", "instagood", "repost", "foodgasm", "healthyfood", "foodlover", "follow4follow", "foodpics", "homemade", "foodphotography", "selfie", "photography", "ps4", "love", "model", "healthy", "bodybuilding"]
    };
  },
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

@import url('./assets/maisonneue/stylesheet.css')


// ==============================================
// =            mixins and variables           =
// =============================================

$family-sans-serif: "Maison Neue", BlinkMacSystemFont, -apple-system, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", "Helvetica", "Arial", sans-serif
$family-monospace: "Maison Mono", monospace
$render-mode: optimizeLegibility


$dark: #444
$verymedium: #666
$medium: #aaa
$light: #ddd
$verylight: #eee

$body-background-color: #fff
$dark: #444
$body-line-height: 1.4
$body-size: 14px
$body-size-mobile: 12px

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
html, body, div, span, applet, object, strong, iframe, h1, h2, h3, h4, h5, h6, p, blockquote, pre, a, abbr, acronym, address, big, cite, code, del, dfn, em, img, ins, kbd, q, s, samp, small, strike, sub, sup, tt, var, b, u, i, center, dl, dt, dd, ol, ul, li, fieldset, form, label, legend, table, caption, tbody, tfoot, thead, tr, th, td, article, aside, canvas, details, embed, figure, figcaption, footer, header, main, menu, nav, output, ruby, section, summary, time, mark, audio, video
  margin: 0
  padding: 0
  border: 0
  font-size: 100%
  font: inherit
  vertical-align: baseline
  text-decoration: none


article, aside, details, figcaption, figure, footer, header, menu, nav, section, main, summary
  display: block

body
  line-height: 1

ol, ul
  list-style: none

blockquote, q
  quotes: none

blockquote:before, blockquote:after, q:before, q:after
  content: ''
  content: none

table
  border-collapse: collapse
  border-spacing: 0

//form resets
input::ms-clear, input[type="password"]::ms-reveal
  display: none

input[type="search"]::-webkit-search-decoration
  display: none

input[type="radio"], input[type="checkbox"]
  margin: 0

button, a.button, input[type="reset"], input[type="submit"], input[type="button"], input[type="image"]
  background: none
  border: 0
  cursor: pointer
  display: inline-block
  overflow: visible
  margin: 0
  outline: 0
  padding: 0
  vertical-align: top
  text-align: center
  text-decoration: none
  width: auto
  -webkit-appearance: none
  -webkit-background-clip: padding
  -moz-background-clip: padding
  background-clip: padding-box
  -webkit-border-radius: 0
  -moz-border-radius: 0
  border-radius: 0
  -webkit-box-sizing: border-box
  -moz-box-sizing: border-box
  box-sizing: border-box

button, input[type="reset"], input[type="submit"], input[type="button"]  
 line-height: normal !important

textarea, select, input[type="date"], input[type="datetime"], input[type="datetime-local"], input[type="email"], input[type="month"], input[type="number"], input[type="password"], input[type="search"], input[type="tel"], input[type="text"], input[type="time"], input[type="url"], input[type="week"] 
  background: none
  border: 0
  margin: 0
  outline: 0
  padding: 0
  text-align: left
  vertical-align: top
  font-size: $body-size
  -webkit-appearance: none
  -webkit-background-clip: padding
  -moz-background-clip: padding
  background-clip: padding-box
  -webkit-border-radius: 0
  -moz-border-radius: 0
  border-radius: 0
  -webkit-box-sizing: border-box
  -moz-box-sizing: border-box
  box-sizing: border-box
  &::-webkit-outer-spin-button,  &::-webkit-inner-spin-button
    -webkit-appearance: none
  
button[disabled], input[disabled], select[disabled], select[disabled] option, select[disabled] optgroup, textarea[disabled] 
  -moz-user-select: -moz-none
  -webkit-user-select: none
  -khtml-user-select: none
  user-select: none
  cursor: default
  filter: progid:DXImageTransform.Microsoft.Alpha(Opacity=25)
  opacity: 0.25

textarea
  min-height: 50px
  overflow: auto
  resize: vertical
  width: 100%

optgroup
  font-style: normal
  font-weight: normal
  font-family: $family-sans-serif

select::-ms-expand
  display: none

@-moz-document url-prefix()
  input,
  button,
  select,
  textarea
    &:invalid
      -moz-box-shadow: none
      box-shadow: none
    &::-moz-focus-inner
      border: 0
      padding: 0
  select
    -moz-appearance: none
    text-indent: 0.01px
    text-overflow: ""
  


// ==============================
// =            general            =
// ==============================



html
  background-color: #fff
  -moz-osx-font-smoothing: grayscale
  -webkit-font-smoothing: antialiased
  min-width: 300px
  overflow-x: hidden
  overflow-y: scroll
  text-rendering: $render-mode

body,
button,
input,
select,
textarea
  font-family: $family-sans-serif

html, body
  color: $dark
  font-weight: 400
  line-height: $body-line-height
  +until(767px)
    font-size: $body-size-mobile
  +from(767px)
    font-size: $body-size

a
  color: $dark

.input
  input
    width: 100%
    color: $dark
    padding: .4em .4em .4em 2em
    font-size: $body-size
    border-bottom: 1px solid $light
    // border-radius: 10px
    &::placeholder
      color: $medium
  i.fa
    color: $medium
    position: absolute
    top: .4em
    width: 2.25em
    text-align: center


#my-app
  position: absolute

.main
  position: relative
  top: 0
  left: 0
  width: 100vw
  margin-bottom: 20em

.btn
  color: $dark
  display: inline-block
  font-weight: 600
  line-height: 1.7
  margin-bottom: .5em
  border-bottom: 1px solid $light
  &:hover
    border-bottom: 1px solid $medium

.container
  position: relative
  width: calc(100vw - 100px)
  max-width: 600px
  margin: 0 auto

.container-tight
  position: relative
  width: calc(100vw - 3em)
  max-width: 600px
  margin: 0 auto

.menu
  margin-top: 1.5em
  line-height: 1em
  .logo1
    font-weight: 900
  .logo2
    font-weight: 300

.search
  // font-size: 130%
  // input
  //   font-size: 130%
  // i.fa
  //   font-size: 130%
  +until(767px)
    margin-top: 3em
    margin-bottom: 3em
  +from(767px)
    margin-top: 10em
    margin-bottom: 10em
  .input
    width: calc(100% - 4em)
    margin: 0 2em


.results-controls
  color: $medium
  margin-bottom: 1em
  .btn, p
    margin-bottom: .25em

.results-info
  margin-bottom: 2em
  .action
    color: $verymedium
  .description
    color: $medium
    &:before
      content: " \2013 "

.results
  //background: yellow
  display: flex
  flex-direction: column
  font-size: 1.4em
  margin-bottom: 2em
  .tagandoptions
    display: flex
    background: url('data:image/svg+xml;utf8,<?xml version="1.0" encoding="UTF-8"?><svg width="1px" height="1px" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><rect x="0" y="0" width="1" height="2" style="fill:#ddd" /></svg>')
    background-repeat: repeat-x
    background-position: 50%
    justify-content: space-between
    align-items: center
    max-width: 100%
    overflow: hidden
    text-overflow: ellipsis
    margin: 0 -.4em
    // line-height: 1.5em
    //border-bottom: 1px solid $light
    &.selected
      .tag
        white-space: nowrap
        //font-weight: 600
      .tag:before
        display: inline-block
        color: $medium
        content: url('data:image/svg+xml;utf8,<?xml version="1.0" encoding="UTF-8"?><svg xmlns="http://www.w3.org/2000/svg" width="0.66667em" height="1em" viewBox="0 0 20 30" style=""><path style="stroke:#aaa; stroke-width:3; fill:transparent;" d="M 6 0 v 30  M 14 0 v 30  M 0 11 h 20  M 0 19 h 20"></path></svg>')
        margin-right: .4em
    .tag
      max-width: calc(100% - 1.5em)
      overflow: hidden
      text-overflow: ellipsis
      background: #fff
      padding: .4em
    .options
      color: $light
      display: flex
      justify-content: space-between
      .option
        padding: .4em
        background: #fff
        a
          color: $light
        a:hover
          color: $medium  
      .option+.option
        margin-left: .75em



.wavedivider
  // animation: mymove .75s ease-in 1;
  margin: 0 -2em
  width: calc(100% + 4em)
  height: 19px
  //background: url('data:image/svg+xml;utf8,<?xml version="1.0" encoding="UTF-8"?><svg xmlns="http://www.w3.org/2000/svg" height="85" viewBox="0 0 1600px 85px" style=""><rect x="0" y="15" width="1200" height="15" style="fill:pink;stroke:pink;stroke-width:0;fill-opacity:1;stroke-opacity:1" /><path id="wave" style="stroke:#555; stroke-width:2; fill:#fff;" d="M 0 17 c 7.684299348848887 0 7.315700651151113 -15 15 -15  s 7.315700651151113 15 15 15  s 7.315700651151113 -15 15 -15 "></path></svg>')
  background: url('data:image/svg+xml;utf8,<?xml version="1.0" encoding="UTF-8"?><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1600px 20px" style=""><rect x="0" y="16" width="1200" height="200" style="fill:white; stroke:pink; stroke-width:2; fill-opacity:1; stroke-opacity:0" /><path id="wave" style="stroke:#555; stroke-width:3; fill:#fff;" d="M -20 17 c 4.555 0 4.555 -10 10 -10  s 4.555 10 10 10  s 4.555 -10 10 -10  s 4.555 10 10 10  s 4.555 -10 10 -10  s 4.555 10 10 10  s 4.555 -10 10 -10  s 4.555 10 10 10  s 4.555 -10 10 -10  s 4.555 10 10 10  s 4.555 -10 10 -10  s 4.555 10 10 10  s 4.555 -10 10 -10  s 4.555 10 10 10  s 4.555 -10 10 -10  s 4.555 10 10 10  s 4.555 -10 10 -10  s 4.555 10 10 10  s 4.555 -10 10 -10  s 4.555 10 10 10  s 4.555 -10 10 -10  s 4.555 10 10 10  s 4.555 -10 10 -10  s 4.555 10 10 10  s 4.555 -10 10 -10  s 4.555 10 10 10  s 4.555 -10 10 -10  s 4.555 10 10 10  s 4.555 -10 10 -10  s 4.555 10 10 10  s 4.555 -10 10 -10  s 4.555 10 10 10  s 4.555 -10 10 -10  s 4.555 10 10 10  s 4.555 -10 10 -10  s 4.555 10 10 10  s 4.555 -10 10 -10  s 4.555 10 10 10  s 4.555 -10 10 -10  s 4.555 10 10 10  s 4.555 -10 10 -10  s 4.555 10 10 10  s 4.555 -10 10 -10  s 4.555 10 10 10  s 4.555 -10 10 -10  s 4.555 10 10 10  s 4.555 -10 10 -10  s 4.555 10 10 10  s 4.555 -10 10 -10  s 4.555 10 10 10  s 4.555 -10 10 -10  s 4.555 10 10 10  s 4.555 -10 10 -10  s 4.555 10 10 10  s 4.555 -10 10 -10  s 4.555 10 10 10  s 4.555 -10 10 -10  s 4.555 10 10 10  s 4.555 -10 10 -10  s 4.555 10 10 10  s 4.555 -10 10 -10  s 4.555 10 10 10  s 4.555 -10 10 -10  s 4.555 10 10 10  s 4.555 -10 10 -10  s 4.555 10 10 10  s 4.555 -10 10 -10  s 4.555 10 10 10  s 4.555 -10 10 -10  s 4.555 10 10 10  s 4.555 -10 10 -10  s 4.555 10 10 10  s 4.555 -10 10 -10  s 4.555 10 10 10  s 4.555 -10 10 -10  s 4.555 10 10 10  s 4.555 -10 10 -10  s 4.555 10 10 10  s 4.555 -10 10 -10  s 4.555 10 10 10  s 4.555 -10 10 -10  s 4.555 10 10 10  s 4.555 -10 10 -10  s 4.555 10 10 10  s 4.555 -10 10 -10  s 4.555 10 10 10  s 4.555 -10 10 -10  s 4.555 10 10 10  s 4.555 -10 10 -10  s 4.555 10 10 10"></path></svg>')
  border-bottom: 0px solid red

.clipboard
  position: fixed
  bottom: 0px
  left: 0px
  width: 100vw
  .clipboard-content
    padding: 2em 0
    background: #fff

// .clipboard
//   display: none
//   margin-bottom: 4em
//   .clipboard-content
//     display: block
//     overflow: hidden
//     height: 0px
//   &
//     .clipboard-content
//       animation: appearlist 0.7s normal forwards ease-in-out
//     &:before,&:after
//       animation: appearwavey 0.7s normal forwards ease-in-out
//   &:before
//     top: 0
//   &:after
//     margin-bottom: -30px
//     bottom: 0 
//   &:before,&:after
//     display: block
//     position: absolute
//     width: 0%
//     height: 30px
//     content: "\00A0"
//     background: url('data:image/svg+xml;utf8,<?xml version="1.0" encoding="UTF-8"?><svg xmlns="http://www.w3.org/2000/svg" viewBox="-20px 20px 1600px 20px" style=""><rect x="0" y="16" width="1200" height="00" style="fill:transparent; stroke:pink; stroke-width:0; fill-opacity:0; stroke-opacity:0" /><path id="wave" style="stroke:#555; stroke-width:2; fill:transparent;" d="M -20 17 c 4.555 0 4.555 -10 10 -10  s 4.555 10 10 10  s 4.555 -10 10 -10  s 4.555 10 10 10  s 4.555 -10 10 -10  s 4.555 10 10 10  s 4.555 -10 10 -10  s 4.555 10 10 10  s 4.555 -10 10 -10  s 4.555 10 10 10  s 4.555 -10 10 -10  s 4.555 10 10 10  s 4.555 -10 10 -10  s 4.555 10 10 10  s 4.555 -10 10 -10  s 4.555 10 10 10  s 4.555 -10 10 -10  s 4.555 10 10 10  s 4.555 -10 10 -10  s 4.555 10 10 10  s 4.555 -10 10 -10  s 4.555 10 10 10  s 4.555 -10 10 -10  s 4.555 10 10 10  s 4.555 -10 10 -10  s 4.555 10 10 10  s 4.555 -10 10 -10  s 4.555 10 10 10  s 4.555 -10 10 -10  s 4.555 10 10 10  s 4.555 -10 10 -10  s 4.555 10 10 10  s 4.555 -10 10 -10  s 4.555 10 10 10  s 4.555 -10 10 -10  s 4.555 10 10 10  s 4.555 -10 10 -10  s 4.555 10 10 10  s 4.555 -10 10 -10  s 4.555 10 10 10  s 4.555 -10 10 -10  s 4.555 10 10 10  s 4.555 -10 10 -10  s 4.555 10 10 10  s 4.555 -10 10 -10  s 4.555 10 10 10  s 4.555 -10 10 -10  s 4.555 10 10 10  s 4.555 -10 10 -10  s 4.555 10 10 10  s 4.555 -10 10 -10  s 4.555 10 10 10  s 4.555 -10 10 -10  s 4.555 10 10 10  s 4.555 -10 10 -10  s 4.555 10 10 10  s 4.555 -10 10 -10  s 4.555 10 10 10  s 4.555 -10 10 -10  s 4.555 10 10 10  s 4.555 -10 10 -10  s 4.555 10 10 10  s 4.555 -10 10 -10  s 4.555 10 10 10  s 4.555 -10 10 -10  s 4.555 10 10 10  s 4.555 -10 10 -10  s 4.555 10 10 10  s 4.555 -10 10 -10  s 4.555 10 10 10  s 4.555 -10 10 -10  s 4.555 10 10 10  s 4.555 -10 10 -10  s 4.555 10 10 10  s 4.555 -10 10 -10  s 4.555 10 10 10  s 4.555 -10 10 -10  s 4.555 10 10 10  s 4.555 -10 10 -10  s 4.555 10 10 10  s 4.555 -10 10 -10  s 4.555 10 10 10  s 4.555 -10 10 -10  s 4.555 10 10 10  s 4.555 -10 10 -10  s 4.555 10 10 10  s 4.555 -10 10 -10  s 4.555 10 10 10  s 4.555 -10 10 -10  s 4.555 10 10 10"></path></svg>')

// .clipboard-content
//   .controls
//     margin-top: 3em
//   .list
//     margin-top: 3em
//     overflow: scroll


// +keyframes(appearwavey)
//   0%
//     width: 0%
//   50%
//     width: 100%
//   100%
//     width: 100%

// +keyframes(appearlist)
//   0%
//     height: 0px
//   50%
//     height: 0px
//   100%
//     height: 100px

</style>