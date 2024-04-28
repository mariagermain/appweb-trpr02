<script setup lang="ts">

import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap"
import NavBar from "./components/NavBar.vue"
</script>

<template>
  <header>
    <NavBar/>
  </header>
  <Suspense><RouterView/></Suspense>
</template>

<style scoped>
</style>
