<template>
    <nav class="navbar navbar-expand-md navbar-light bg-white shadow-sm">
        <div class="container">

            <ul class="navbar-nav ml-auto">
                <li class="nav-item">
                    <router-link class="nav-link" :to="{ name: 'Home' }">Home</router-link>
                </li>
            </ul>

            <ul class="navbar-nav ml-auto">
                <li class="nav-item ">
                    <router-link class="nav-link" :to="{ name: 'CategoryList' }">Categories</router-link>
                </li>
            </ul>

            <ul class="navbar-nav ml-auto">
                <li class="nav-item">
                    <router-link class="nav-link" :to="{ name: 'ProductList' }">Products</router-link>
                </li>
            </ul>

            <div class="collapse navbar-collapse" id="navbarSupportedContent">

                <ul class="navbar-nav mr-auto">

                </ul>

                <ul class="navbar-nav ml-auto">
                    <li class="nav-item dropdown">

                    </li>
                </ul>
            </div>
        </div>
    </nav>
</template>

<script>
  export default {
      mounted() {

      }
  }
</script>

<style scoped>
    .router-link-active {
        background:lightgray;
    }
</style>
