<script setup lang = "ts">
import axios, { type AxiosResponse } from 'axios';
import { ScoreInfo } from '@/scripts/ScoreInfo';

// Chargement de l'API
const API_SCORE_URL = "http://127.0.0.1:3000/ranking"

let scoresData = await getScores().catch(()=>{
    console.log("ERREUR API")
});

async function getScores(){
    const { data }:AxiosResponse<any,any> = await axios.get(API_SCORE_URL);
    return data;
}

// Création des objet ScoreInfo
let scoreInfos:ScoreInfo[] = [];

for (let i:number = 0; i < scoresData.length; i++){
    scoreInfos.push(new ScoreInfo(scoresData[i]['name'], scoresData[i]['score']));
    console.log(scoreInfos[i].getPlayerName)
}
</script>

<template>

</template>

<style scoped>
</style>