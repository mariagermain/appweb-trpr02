<script setup lang="ts">
import type { AxiosResponse } from 'axios';
import ScoreTable from './../components/ScoreTable.vue'
import ErrorMsg from './../components/ErrorMsg.vue'
import { ref } from 'vue';

let showLoadingError = ref(false);

function loadingError(){
    showLoadingError.value = true;
    console.log("OUPS")
}
</script>

<template>
    <h1>Score</h1>
    <ErrorMsg :show="showLoadingError" message="Impossible de contacter l'API."></ErrorMsg>
    <suspense>
        <ScoreTable @loading-error="loadingError()"></ScoreTable> 
    </suspense>
</template>

<style scoped>
</style>