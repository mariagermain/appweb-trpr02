<script setup lang="ts">
    import { RouterLink, RouterView } from 'vue-router'

</script>

<template>
    <nav class="navbar navbar-expand-lg navbar-light bg-light container-md">
        <h1 class="navbar-brand">TITRE DU JEU</h1>
        <RouterLink class="btn" to="/" id="homePage">Accueil</RouterLink>
        <RouterLink class="btn" to="/score" id="scorePage">Score</RouterLink>
    </nav>
</template>

<style>
</style>