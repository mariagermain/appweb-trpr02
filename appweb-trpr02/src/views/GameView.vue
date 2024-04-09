<script setup lang="ts">
import { ref } from 'vue';
import Actions from '../components/Actions.vue'
import Missions from '../components/Missions.vue'
import PlayerInfos from '../components/PlayerInfos.vue'

</script>

<template>
    <div class="container">
        <div class="row">
            <Actions/>
            <Missions/>
        </div>
        <div class="row">
            <PlayerInfos/>
            <PlayerInfos/>
        </div>
    </div>
</template>

<style scoped>
</style>