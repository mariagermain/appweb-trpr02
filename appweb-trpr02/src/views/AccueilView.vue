<script setup lang="ts">
import { ref } from 'vue';
import AccueilForm from '../components/AccueilForm.vue'
import ErrorMsg from '../components/ErrorMsg.vue'

let showLoadingError = ref(false);

function loadingError(){
    showLoadingError.value = true;
}

</script>

<template>
    <h3>Votre objectif: survivre à 5 missions en obtenant le plus de crédits galactiques</h3>
    <ErrorMsg :show="showLoadingError" message="Impossible de contacter l'API."></ErrorMsg>
    <suspense>
        <AccueilForm @loading-error="loadingError()"/>
    </suspense>
</template>

<style scoped>
</style>