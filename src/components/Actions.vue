<script setup lang="ts">
import { ref } from 'vue';

let showLoadingError = ref(false);

function loadingError(){
    showLoadingError.value = true;
}

</script>

<template>
    <div class="container bg-dark border border-2 rounded w-60">
        <div class="p-2 bg-primary text-white">Actions</div>
        <span class="col m-1">
            <button type="button" class="btn btn-primary">Combattre</button>
            <button type="button" class="btn btn-primary m-1">Terminer la mission</button>
            <button type="button" class="btn btn-primary">Terminer la mission et reparer le vaisseau</button>
        </span>
    </div>
</template>

<style scoped>
</style>