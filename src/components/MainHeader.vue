<!--==============================
=            template            =
===============================-->

<template>
<div id="main-header-c">

<section>
  <div class="container">

    <div class="columns is-mobile is-gapless">
      <div class="column logo">
        <ul>
          <router-link tag="li" :to="{ path: '/' }">
            <a href="javascript:;"><span class="logo1">hashbrowns</span><span class="logo2">.cc</span></a>
          </router-link>
        </ul>
      </div>

      <div class="column menu has-text-right">
        <ul>
          <router-link tag="li" :to="{ path: '/about' }">
            <a href="javascript:;">
              <span class="is-hidden-mobile">about</span>
              <span class="icon is-hidden-tablet">
                <i class="fa fa-info"></i>
              </span>
            </a>
          </router-link>
        </ul>
      </div>
    </div>

  </div>
</section>




</div>
</template>


<!--============================
=            script            =
=============================-->

<script>
export default {
  name: 'main-header',
  data: function () {
    return {}
  },
  methods: {},
  computed: {}
}
</script>


<!--===========================
=            style            =
============================-->

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="sass">


</style>
