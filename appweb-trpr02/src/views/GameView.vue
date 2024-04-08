<script setup lang="ts">
import { ref } from 'vue';

let showLoadingError = ref(false);

function loadingError(){
    showLoadingError.value = true;
}

</script>

<template>

</template>

<style scoped>
</style>