<script setup lang="ts">
import { ref } from 'vue';

let showLoadingError = ref(false);

function loadingError(){
    showLoadingError.value = true;
}

</script>

<template>
    <div class="container">
        <span class="p-2">Actions</span>
        <span class="row">
            <button type="button" class="btn btn-primary">Combattre</button>
            <button type="button" class="btn btn-primary">Terminer la mission</button>
            <button type="button" class="btn btn-primary">Terminer la mission et reparer le vaisseau</button>
        </span>
    </div>
</template>

<style scoped>
</style>