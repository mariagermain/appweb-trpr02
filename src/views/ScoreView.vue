<script setup lang="ts">
import type { AxiosResponse } from 'axios';
import ScoreTable from './../components/ScoreTable.vue'
import ErrorMsg from './../components/ErrorMsg.vue'
import { ref } from 'vue';

let showLoadingError = ref(false);

function loadingError(){
    showLoadingError.value = true;
}
</script>

<template>
    <h1 class="text-center">Pointage</h1>
    <hr  class="devider">
    <ErrorMsg :show="showLoadingError" message="Impossible de contacter l'API."></ErrorMsg>
    <suspense>
        <ScoreTable @loading-error="loadingError()"></ScoreTable> 
    </suspense>
</template>

<style scoped>
</style>