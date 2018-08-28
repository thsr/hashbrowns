// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'



/*======================================
=            firebase stuff            =
======================================*/

import firebase from 'firebase/app'
import VueFire from 'vuefire'

Vue.use(VueFire)

import { firebaseApp } from '@/js/firebase'

let app

firebaseApp

firebase.auth().onAuthStateChanged(function(user) {
  if (!app) {
    /* eslint-disable no-new */
    app = new Vue({
      el: '#app',
      template: '<App/>',
      components: { App },
      router
    })
  }
});

/*=====  End of firebase stuff  ======*/






/*=========================================
=            progressbar stuff            =
=========================================*/
import VueProgressBar from 'vue-progressbar'

const options = {
  color: 'black',
  failedColor: 'red',
  thickness: '2px',
  transition: {
    speed: '0.5s',
    opacity: '0.1s',
    termination: 300
  },
  autoRevert: false,
  location: 'top'
}

Vue.use(VueProgressBar, options)
/*=====  End of progressbar stuff  ======*/




/*==========================================
=            vuemodal            =
==========================================*/
import vmodal from 'vue-js-modal'
Vue.use(vmodal)

/*=====  End of vuemodal  ======*/





/*==========================================
=            vueclipboard stuff            =
==========================================*/
import VueClipboard from 'vue-clipboard2'

Vue.use(VueClipboard)
/*=====  End of vueclipboard stuff  ======*/




/*====================================
=            vee validate            =
====================================*/
import VeeValidate from 'vee-validate'

Vue.use(VeeValidate)

import { Validator } from 'vee-validate'

const dictionary = {
  en: {
    messages:{
      required: () => 'hashtags can\'t be empty :('
    }
  }
}

Validator.updateDictionary(dictionary)

Validator.extend('specialChars', {
  getMessage: field => 'hashtags can\'t have special characters or spaces :(',
  validate: value => !/[^a-zA-Z0-9_ÂÃÄÀÁÅÆÇÈÉÊËÌÍÎÏÐÑÒÓÔÕÖØÙÚÛÜÝÞßàáâãäåæçèéêëìíîïðñòóôõöøùúûüýþÿ]/.test(value)
})

/*=====  End of vee validate  ======*/


/*===============================
=            vue gtm            =
===============================*/
import VueGtm from 'vue-gtm'

Vue.use(VueGtm, {
  debug: false,
  vueRouter: router
})


/*=====  End of vue gtm  ======*/




/*====================================
=            feather icon            =
====================================*/

import { install as VueFeatherIcon } from 'vue-feather-icon-corrected'
 
Vue.use(VueFeatherIcon)
/*=====  End of feather icon  ======*/





/*===========================================
=            vue bootstrap stuff            =
===========================================*/

import BootstrapVue from 'bootstrap-vue'

Vue.use(BootstrapVue)

/*=====  End of vue bootstrap stuff  ======*/



Vue.config.productionTip = false
