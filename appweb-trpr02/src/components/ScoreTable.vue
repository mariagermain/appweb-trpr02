<script setup lang = "ts">
import axios, { type AxiosResponse } from 'axios';
import { ScoreInfo } from '@/scripts/ScoreInfo';

const emit = defineEmits(['loading-error']);

// Chargement de l'API
const API_SCORE_URL = "http://127.0.0.1:3000/ranking"

let scoresData = await getScores().catch(()=>{
    console.log("ERREUR API");
    emit('loading-error');
});

async function getScores(){
    const { data }:AxiosResponse<any,any> = await axios.get(API_SCORE_URL);
    return data;
}

// Création des objet ScoreInfo
let scoreInfos:ScoreInfo[] = [];

for (let i:number = 0; i < scoresData.length; i++){
    scoreInfos.push(new ScoreInfo(0,scoresData[i]['name'], scoresData[i]['score']));
}
</script>

<template>
    <div class="score-table">
        <table class="table table-striped">
            <thead>
                <tr>
                    <th>Position</th>
                    <th>Nom du joueur</th>
                    <th>Score</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="scoreInfo of scoreInfos">
                <td> 1 </td>
                <td>{{ scoreInfo.getPlayerName() }}</td>
                <td>{{ scoreInfo.getScore() }}</td>
            </tr>
            </tbody>

        </table>

    </div>
</template>

<style scoped>
    .score-table{
        margin-left :25%;
        margin-right :25%;
        border :solid 2px black;
        border-radius:5px;
    }
</style>