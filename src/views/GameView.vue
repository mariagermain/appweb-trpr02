<script setup lang="ts">
import { computed, onMounted, onUpdated, ref, type ComputedRef, type Ref } from 'vue';
import Actions from '../components/Actions.vue'
import Missions from '../components/Missions.vue'
import PlayerInfos from '../components/PlayerInfos.vue'
import type { Player, Character } from '@/scripts/Types';
import AppService from '../../AppService';

const props = defineProps<{
    playerName:string,
    shipName:string
}>()
const APP_SERVICE : AppService = new AppService();
let characters : Character[] = await APP_SERVICE.getCharacters() 
let opponent = computed({
    get(){ return getRandomCharacter()},
    set(value : Character){ opponent.value = value} 
});


let player : Player = {name:props.playerName, maxHealth:0, credit:0}

function getRandomCharacter() : Character{
    return characters[Math.random()*(characters.length + 1)]
}

console.log(opponent.value)

</script>

<template>
    <div class="container w-100">
        <div class="row">
            <Actions class="col m-3"/>
            <Missions class="col m-3"/>
        </div>
        <div class="row">
            <PlayerInfos :playerName="player.name" :shipName="shipName" class="col m-3"/>
            <PlayerInfos :playerName="'fv'" :shipName="'grrrrrrrrrrrrrr'" class="col m-3"/>
        </div>
    </div>
</template>

<style scoped>
</style>