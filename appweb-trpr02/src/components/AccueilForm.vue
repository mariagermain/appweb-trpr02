<script setup lang="ts">
import axios, { type AxiosResponse } from 'axios';
import { type Ship } from "../App.vue"

const emit = defineEmits(['loading-error']);

// Chargement de l'API
const API_SHIPS_URL = "http://127.0.0.1:3000/ships"

let shipsData = await getShips().catch(()=>{;
    emit('loading-error');
}); 

async function getShips(){
    const { data }:AxiosResponse<any,any> = await axios.get(API_SHIPS_URL);
    return data;
}

let ships : Ship[] = [];
shipsData.forEach((element: { id: string; name: string;}) => {
    ships.push({
          id: element.id,
          name: element.name,
    } )
})



</script>

<template>
    <form class>
        <div class="input-group mb-3">
            <input type="text" class="form-control" placeholder="Votre nom" aria-label="Username" aria-describedby="basic-addon1">
        </div>
        <div class="col-12">
            <label class="visually-hidden" for="inlineFormSelectPref">Vaisseau</label>
            <select class="form-select" id="inlineFormSelectPref">
                <option selected>choisissez...</option>
                <option v-for="ship in ships" :key="ship.id">{{ ship.name }}</option>
            </select>
  </div>
    </form>
</template>

<style scoped>
</style>