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

const APP_SERVICE : AppService = new AppService();

let opponent = await APP_SERVICE.getCharacter(props.randIndex);
let player : Player = {name:props.playerName, maxHealth:0, credit:0};

</script>

<template>
    <div class="container w-100">
        <div class="row">
            <Actions class="col m-3"/>
            <Missions class="col m-3"/>
        </div>
        <div class="row">
            <PlayerInfos :playerName="player.name" :shipName="shipName" class="col m-3"/>
            <PlayerInfos :playerName="opponent.name" :shipName="opponent.ship.name" class="col m-3"/>
        </div>
    </div>
</template>

<style scoped>
</style>