<script setup lang="ts">
import { onMounted, onUpdated, ref, type Ref } from 'vue';
import Actions from '../components/Actions.vue'
import Missions from '../components/Missions.vue'
import PlayerInfos from '../components/PlayerInfos.vue'
import type { Player, Character } from '@/scripts/Types';
import AppService from '../../AppService';

const props = defineProps<{
    playerName:string,
    shipName:string,
    randIndex:number
}>()

const currentMission = ref(1);

const APP_SERVICE : AppService = new AppService();

let opponent = ref(await APP_SERVICE.getCharacter(props.randIndex));
opponent.value.ship.vitality = 100;

let player : Ref<Character> = ref({
    id: 0, name: props.playerName, experience: 4, credit: 0,
    ship: {
        id: '0',
        name: props.shipName,
        vitality: 100
    }
});


// Action du joueur :
function onClickAttack(){
    switch(player.value.experience){
        case 1: {
            attack(20, opponent.value)
            break;
        }
        case 2: {
            attack(35, opponent.value)
            break;
        }
        case 3: {
            attack(50, opponent.value)
            break;
        }
        case 4: {
            attack(70, opponent.value)
            break;
        }
    
    }
    switch(opponent.value.experience){
        case 1: {
            attack(20, player.value)
            break;
        }
        case 2: {
            attack(35, player.value)
            break;
        }
        case 3: {
            attack(50, player.value)
            break;
        }
        case 4: {
            attack(70, player.value)
            break;
        }
    }
    console.log(player.value.ship.vitality)
}

function onClickEndMission(){

}
function onClickRepair(){

}

function attack(probability : number, characterToAttack : Character){
    if(Math.random() * 100 < probability){
        characterToAttack.ship.vitality -= Math.floor((Math.random() * 3) + 3);
    }
}

</script>

<template>
    <div class="container w-100">
        <div class="row">
            <Actions class="col m-3" @attack="onClickAttack" @end-mission="onClickEndMission" @repair="onClickRepair"/>
            <Missions class="col m-3" :currentMission="currentMission"/>
        </div>
        <div class="row">
            <PlayerInfos :playerName="player.name" :shipName="shipName" :nbGalacticCredits="player.credit" :experience="player.experience" :vitality="player.ship.vitality" class="col m-3"/>
            <PlayerInfos :playerName="opponent.name" :shipName="opponent.ship.name" :nbGalacticCredits="opponent.credit" :experience="opponent.experience" :vitality="opponent.ship.vitality" class="col m-3"/>
        </div>
    </div>
</template>

<style scoped>
</style>