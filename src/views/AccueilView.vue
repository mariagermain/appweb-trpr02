<script setup lang="ts">
import { ref, type Ref } from 'vue';
import AccueilForm from '../components/AccueilForm.vue'
import ErrorMsg from '../components/ErrorMsg.vue'
import { useRouter, type Router } from 'vue-router';
import type { Ship } from '@/scripts/Types';

let ROUTER : Router = useRouter();

let showLoadingError = ref(false);

let playerName: Ref<string> = ref("");
let ship: Ref<Ship>;

function loadingError(){
    showLoadingError.value = true;
}

function submitForm(playerName : string, ship : Ship){
    ROUTER.push({ name : 'game', params : {playerName:playerName, shipName:ship.name}});
}

</script>

<template>
    <h3>Votre objectif: survivre à 5 missions en obtenant le plus de crédits galactiques</h3>
    <ErrorMsg :show="showLoadingError" message="Impossible de contacter l'API."></ErrorMsg>
    <suspense>
        <AccueilForm @loading-error="loadingError()" @submit-form="submitForm"/>
    </suspense>
</template>

<style scoped>
</style>