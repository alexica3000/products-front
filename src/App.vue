<template>
  <div>
    <Navbar/>
    <main class="py-4">
      <div class="container">
        <div class="row justify-content-center">
          <div class="col-md-10">
            <router-view></router-view>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
  import Navbar from "@/components/Navbar";

  export default {
    name: 'App',
    components: {
      Navbar
    }
  }
</script>

<style>

</style>
