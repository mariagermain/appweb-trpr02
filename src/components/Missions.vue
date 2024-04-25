<script setup lang="ts">
import { ref } from 'vue';

defineProps({
    currentMission:Number
})
const NB_MISSIONS : number = 5;

</script>

<template>
    <div class="container rounded bg-dark border-2 border text-white w-40">
        <div class="p-2 bg-primary">Missions</div>
        <div>{{ currentMission }} / {{ NB_MISSIONS }}</div>
        <div>Objectif: survivre à 5 missions en obtenant le plus de crédits.</div>
    </div>
</template>

<style scoped>
</style>