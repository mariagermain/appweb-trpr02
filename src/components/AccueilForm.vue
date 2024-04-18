<script setup lang="ts">
import type { Ship } from "../scripts/Types";
import AppService from "../../AppService"
import { useRouter, type Router } from "vue-router";
import { ref, type Ref } from "vue";
import ErrorList from '../components/ErrorList.vue'
const emit = defineEmits(['loading-error', 'submit-form']);



// Chargement de l'API
const APP_SERVICE : AppService = new AppService();

let ships : Ship[] = await APP_SERVICE.getShips().catch(() => {
    emit('loading-error');
}).then(it => it || []);

// form
let playerName :string = "";
let selectedShip :Ship;

// erreurs
let errorList:Ref<string[]> = ref([]);

function validateForm():boolean{
    errorList.value = [];
    if (playerName.trim().length <= 0)
        errorList.value.push("Le nom du joueur est obligatoire.") ;
    
    if (selectedShip == undefined || selectedShip == null) 
        errorList.value.push("Veuillez choisir un vaisseau.");
    
    return errorList.value.length == 0;
}

function submitForm():void{
    if (validateForm()) 
        emit('submit-form',playerName, selectedShip );
}

</script>

<template>
    <form class="form-outline w-50 mx-auto border border-secondary rounded p-3">
        <ErrorList title="Impossible de débuter la partie." :errors="errorList"></ErrorList>
        <div class="form-group pb-3">
            <input v-model="playerName" type="text" class="form-control" placeholder="Votre nom" aria-label="Username" aria-describedby="basic-addon1">
        </div>
        <div class="form-group pb-3">
            <label for="select-ship">Vaisseau:</label>
            <select class="form-select" id="select-ship" v-model="selectedShip">
                <option v-for="ship in ships"   :key="ship.id" v-bind:value="{ id: ship.id, name: ship.name }">{{ ship.name }}</option>
            </select>
        </div>
        <div class="">
            <button type="button" @click="submitForm()" class="btn btn-primary w-100">Débuter la partie</button>
        </div>
    </form>
</template>

<style scoped>
</style>