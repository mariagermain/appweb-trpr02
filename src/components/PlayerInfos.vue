<script setup lang="ts">
import { ref } from 'vue';

const props = defineProps<{
    playerName: String,
    shipName: String,
    nbGalacticCredits: number,
    experience : number,
    vitality : number
}>()
const EXPERIENCES = ['Débutant', 'Confirmé.', 'Expert', 'Maitre'];
let experience : string = EXPERIENCES[props.experience - 1]


function getProgressBarStyle(){
    if(props.vitality < 0){
        return"width: 0%;";
    } else if (props.vitality > 0 && props.vitality <= 25){
        return "width: 25%;";
    } else if (props.vitality > 25 && props.vitality <= 50){
        return "width: 50%;";
    } else if (props.vitality > 50 && props.vitality <= 75){
        return "width: 75%;";
    } else {
        return "width: 100%;";
    }
}
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
        <div class="progress m-1">
            <div class="progress-bar" role="progressbar" :style="getProgressBarStyle()" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100">{{ $props.vitality}}</div>
        </div>
    </div>
</template>

<style scoped>
</style>