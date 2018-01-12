<template>

<div class="container container-regular-page">
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
</div>

</template>

<script>

export default {

}
</script>

<style scoped>

</style>
