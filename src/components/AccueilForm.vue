<script setup lang="ts">
import type { Ship } from "../scripts/Types";
import AppService from "../../AppService"
import { useRouter, type Router } from "vue-router";
import { ref, type Ref } from "vue";

const emit = defineEmits(['loading-error', 'submit-form']);

let playerName : string;
let selectedShip : Ship;

// Chargement de l'API
const APP_SERVICE : AppService = new AppService();

let ships : Ship[] = await APP_SERVICE.getShips().catch(() => {
    emit('loading-error');
}).then(it => it || []);


</script>

<template>
    <form class="form-outline w-50 mx-auto border border-secondary rounded p-3">
        <div class="form-group pb-3">
            <input v-model=playerName type="text" class="form-control" placeholder="Votre nom" aria-label="Username" aria-describedby="basic-addon1">
        </div>
        <div class="form-group pb-3">
            <label for="select-ship">Vaisseau:</label>
            <select class="form-select" id="select-ship" v-model="selectedShip">
                <option v-for="ship in ships" :key="ship.id" >{{ ship.name }}</option>
            </select>
        </div>
        <div class="">
            <button type="button" @click="emit('submit-form', playerName, selectedShip)" class="btn btn-primary w-100">Débuter la partie</button>
        </div>
    </form>
</template>

<style scoped>
</style>