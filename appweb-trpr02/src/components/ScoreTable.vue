<script setup lang = "ts">
import axios, { type AxiosResponse } from 'axios';
import { ScoreInfo } from '@/scripts/ScoreInfo';

const emit = defineEmits(['loading-error']);

// Chargement de l'API
const API_SCORE_URL = "http://127.0.0.1:3000/ranking"
let loadingSuccess:boolean = false;

let scoresData = await getScores().catch(()=>{
    console.log("ERREUR API");
    loadingSuccess = false;
    emit('loading-error');
});

async function getScores(){
    const { data } : AxiosResponse<any,any> = await axios.get(API_SCORE_URL);
    return data;
}

// Création des objet ScoreInfo
let scoreInfos:ScoreInfo[] = [];

for (let i:number = 0; i < scoresData.length; i++){
    scoreInfos.push(new ScoreInfo(scoresData[i]['name'], scoresData[i]['score']));
    console.log(scoreInfos[i].getPlayerName())
}
loadingSuccess = true;
</script>

<template>
    <div v-if="loadingSuccess">
        <ul>
            <li v-for="scoreInfo of scoreInfos">Joueur : {{ scoreInfo.getPlayerName() }} | Score : {{ scoreInfo.getScore() }}</li>
        </ul>
    </div>

    <div v-if="!loadingSuccess">
        <p>Impossible de contacter l'API.</p>
    </div>
</template>

<style scoped>
</style>