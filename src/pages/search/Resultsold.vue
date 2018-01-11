<template>
<div id="search-results-c">

<div class="hero">
  <div class="hero-body">
    
    <div class="container">
  
      <div class="columns">
        <div class="column is-half is-offset-one-quarter has-text-centered">

          <search-field></search-field>

        </div>
      </div>

    </div>

  </div>
</div>

<section>
  <div class="container">

    <div class="columns">
      <div id="taglist" class="column has-text-centered">
        <ul>
          <li v-if="hashtagSearch.res.error">{{hashtagSearch.res.error}}</li>
          <li v-for="tag in hashtagSearch.res.data" :class="{'selected': tag.isSelected}">
            <a href="javascript:;" v-on:click="tag.isSelected = !tag.isSelected">#{{tag.text}}</a>
          </li>
        </ul>
      </div>
    </div>

     <div class="columns">
        <div id="resultcontrols" class="column">
          <ul>
            <li v-if="hashtagSearch.res.data.length > 0 && listOfSelected.length < 1">
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
import SearchField from '@/components/SearchField.vue'

export default {

  name: 'search-results',
  
  components: {
    SearchField
  },

  data () {
    return {
      copyText: '',
      isCopied: false,
      hashtagSearch: {
        req: {
          text: '',
          hasSpecialCharacters: false
        },
        res: {
          data: [{"text":"lunes","count":7},{"text":"nachos","count":4},{"text":"tampico","count":4},{"text":"tacotuesday","count":4},{"text":"foodporn","count":4},{"text":"food","count":4},{"text":"quiz","count":4},{"text":"vegan","count":4},{"text":"polloconmole","count":3},{"text":"mexico","count":3},{"text":"margaritas","count":3},{"text":"tequila","count":3},{"text":"sw4","count":3},{"text":"delicious","count":2},{"text":"austin","count":2},{"text":"salioelsol","count":2},{"text":"recipe","count":2},{"text":"burritos","count":2},{"text":"fishtacos","count":2},{"text":"monday","count":2},{"text":"kbbq","count":2},{"text":"marketing","count":2},{"text":"mexicanfood","count":2},{"text":"dance","count":2},{"text":"actor","count":2},{"text":"paracomenzarlasemana","count":2},{"text":"deliciosos","count":2},{"text":"soycaníbal","count":2},{"text":"cochinita","count":2},{"text":"breakfast","count":2}],
          //data: [],
          error: ''
        }
      }
    }
  },

  computed: {
    hello () {return "hello";}
  },

  methods: {
    onCopy () {
      this.isCopied = true;
      setTimeout( () => {
        this.isCopied = false;
      }, 1700);
    }
  }

};
</script>





