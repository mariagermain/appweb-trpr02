<script setup lang="ts">
import { ref } from 'vue';

let showLoadingError = ref(false);

const emit = defineEmits(['attack', 'end-mission', 'repair'])

function loadingError(){
    showLoadingError.value = true;
}

function attack() {
    emit('attack');
}

function endMission() {
    emit('end-mission');
}
function repair() {
    emit('repair');
}

</script>

<template>
    <div class="container bg-dark border border-2 rounded w-60">
        <div class="p-2 bg-primary text-white">Actions</div>
        <span class="col m-1">
            <button type="button" class="btn btn-primary" @click="attack()">Combattre</button>
            <button type="button" class="btn btn-primary m-1" @click="endMission()">Terminer la mission</button>
            <button type="button" class="btn btn-primary" @click="repair()">Terminer la mission et reparer le vaisseau</button>
        </span>
    </div>
</template>

<style scoped>
</style>