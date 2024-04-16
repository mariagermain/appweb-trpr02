<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap"

export type Ship = {
    id: string
    name: string
}

</script>

<template>
  <header>
    <nav class="navbar navbar-expand-lg navbar-light bg-light container-md">
        <h1 class="navbar-brand">TITRE DU JEU</h1>
        <RouterLink class="btn" to="/">Accueil</RouterLink>
        <RouterLink class="btn" to="/score">Score</RouterLink>
    </nav>
  </header>
  <RouterView />
</template>

<style scoped>
</style>
