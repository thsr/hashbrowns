<template>

<div class="container container-regular-page">
  <div class="row">
    <div class="col-md-6 offset-md-3 mt-5">
            <h1>Profile</h1>
            <hr>
    </div>
    <div class="col-9 col-md-4 offset-md-3">
            <h4>Sign out</h4>
            <span>Sign out of the current session on the current device</span>
    </div>
    <div class="col-3 col-md-2 d-flex align-items-center justify-content-end">
            <router-link :to="{ path: '/signout' }" class="btn btn-outline-primary">Sign out</router-link>
    </div>



    <div class="col-md-6 offset-md-3">
            &nbsp;
    </div>
    <div class="col-md-6 offset-md-3 mt-5">
            <h1>Settings</h1>
            <hr>
    </div>
    <div class="col-9 col-md-4 offset-md-3">
            <h4>Your email</h4>
            <span>youremail@gmail.com</span>
    </div>
    <div class="col-3 col-md-2 d-flex align-items-center justify-content-end">
            <a href="javascript:;" class="btn btn-outline-primary">Edit</a>
    </div>
    <div class="col-md-6 offset-md-3"> 
            <hr>
    </div>
    <div class="col-9 col-md-4 offset-md-3">
            <h4>Your password</h4>
            <span>&bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;</span>
    </div>
    <div class="col-3 col-md-2 d-flex align-items-center justify-content-end">
            <a href="javascript:;" class="btn btn-outline-primary">Edit</a>
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
