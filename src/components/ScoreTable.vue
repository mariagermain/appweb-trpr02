<script setup lang = "ts">
import { type ScoreInfo } from '@/scripts/Types';
import AppService from '../../AppService';

const emit = defineEmits(['loading-error']);

// Chargement de l'API
const APP_SERVICE : AppService = new AppService();

let scoreInfos:ScoreInfo[] = await APP_SERVICE.getScores().catch(()=>{
    emit('loading-error');
}).then(it => it || []);

sortScores();

// Pour trier le score des joueurs (le premier se retrouve en haut, etc..)
function sortScores(){
    let isSorted = false;

    while (!isSorted){
        isSorted = true;
        for(let i = 0; i < scoreInfos.length-1; i ++){
            if (scoreInfos[i]['score'] < scoreInfos[i+1]['score']){
                let temp = scoreInfos[i];
                scoreInfos[i] = scoreInfos [i+1];
                scoreInfos[i+1] = temp;
                isSorted = false;
            }
        }
    }
    for (let i = 0; i<scoreInfos.length; i ++){
        scoreInfos[i]['id'] = i+1;
    }
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
                <td> {{ scoreInfo['id'] }} </td>
                <td>{{ scoreInfo['name']}}</td>
                <td>{{ scoreInfo['score'] }}</td>
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