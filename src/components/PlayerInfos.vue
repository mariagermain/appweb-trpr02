<script setup lang="ts">
import { computed, ref, watch } from 'vue';


const props = defineProps<{
    playerName: String,
    shipName: String,
    nbGalacticCredits: number,
    experience : number,
    vitality : number
}>()
const EXPERIENCES = ['Débutant', 'Confirmé.', 'Expert', 'Maitre'];
let experience : string = EXPERIENCES[props.experience - 1]

let initialLifePoint = props.vitality;


// Quand le nom du joueur change, on actualise la vie max.
watch(() => props.playerName, () => {
      initialLifePoint = props.vitality;
});

function getProgressBarStyle(){
    return "width: "+ (props.vitality / initialLifePoint * 100) + "%;";
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