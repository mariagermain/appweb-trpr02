<script setup lang="ts">
import { ref } from 'vue';
import Actions from '../components/Actions.vue'
import Missions from '../components/Missions.vue'
import PlayerInfos from '../components/PlayerInfos.vue'
import type { Ship } from '@/scripts/Types';

defineProps<{
    playerName: string,
    ship: Ship,
}>()

</script>

<template>
    <div class="container w-100">
        <div class="row">
            <Actions class="col m-3"/>
            <Missions class="col m-3"/>
        </div>
        <div class="row">
            <PlayerInfos :playerName=playerName :shipName=ship.name class="col m-3"/>
            <PlayerInfos :playerName="'fv'" :shipName="''" class="col m-3"/>
        </div>
    </div>
</template>

<style scoped>
</style>