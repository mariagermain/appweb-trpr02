<script setup lang="ts">
import { ref } from 'vue';

const props = defineProps<{
    playerName: String,
    shipName: String,
    nbGalacticCredits: number,
    experience : number
}>()
const EXPERIENCES = ['Débutant', 'Confirmé.', 'Expert', 'Maitre'];
let experience : string = EXPERIENCES[props.experience - 1]

</script>

<template>
    <div class="container bg-dark text-white rounded border-2 border">
        <div class="p-2 bg-primary">{{ props.playerName }}</div>
        <div class="row p-2">
            {{ experience }} - {{ $props.nbGalacticCredits }} CG
        </div>
        <div>
            {{ props.shipName }}
        </div>
        <div class="w-100 border border-1 border-light mt-1 mb-1">
            <div class="p-1">
                    
            </div>
        </div>
    </div>
</template>

<style scoped>
</style>