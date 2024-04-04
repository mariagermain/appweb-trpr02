<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <header>
    <div>
      <h1>TITRE DU JEU</h1>
      <nav>
        <RouterLink to="/">Accueil</RouterLink>
        <RouterLink to="/score">Score</RouterLink>
      </nav>
    </div>
  </header>

  <RouterView />
</template>

<style scoped>

</style>
