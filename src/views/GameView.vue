<script setup lang="ts">
import { ref } from 'vue';
import Actions from '../components/Actions.vue'
import Missions from '../components/Missions.vue'
import PlayerInfos from '../components/PlayerInfos.vue'

</script>

<template>
    <div class="container w-100">
        <div class="row">
            <Actions class="col m-3"/>
            <Missions class="col m-3"/>
        </div>
        <div class="row">
            <PlayerInfos class="col m-3"/>
            <PlayerInfos class="col m-3"/>
        </div>
    </div>
</template>

<style scoped>
</style>