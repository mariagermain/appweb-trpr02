<script setup lang="ts">
import { Ship } from "../scripts/Ship"
import AppService from "../../AppService"

const emit = defineEmits(['loading-error']);

// Chargement de l'API
const APP_SERVICE = new AppService();

let ships : void | Ship[] = await APP_SERVICE.getShips().catch(()=>{
    emit('loading-error');
});


</script>

<template>
    <form class="form-outline w-50 mx-auto border border-secondary rounded p-3">
        <div class="form-group pb-3">
            <input type="text" class="form-control" placeholder="Votre nom" aria-label="Username" aria-describedby="basic-addon1">
        </div>
        <div class="form-group pb-3">
            <label for="select-ship">Vaisseau:</label>
            <select class="form-select" id="select-ship">
                <option v-for="ship in ships" :key="ship.id">{{ ship.name }}</option>
            </select>
        </div>
        <div class="">
            <button type="button" class="btn btn-primary w-100">Débuter la partie</button>
        </div>
    </form>
</template>

<style scoped>
</style>