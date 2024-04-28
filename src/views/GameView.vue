<script setup lang="ts">
import { ref, type Ref } from 'vue';
import Actions from '../components/Actions.vue'
import Missions from '../components/Missions.vue'
import PlayerInfos from '../components/PlayerInfos.vue'
import type { Player, Character } from '@/scripts/Types';
import AppService from '../../AppService';
import GameMsg from '@/components/GameMsg.vue';
import router from '@/router';
import { onBeforeRouteLeave, type RouteLocationNormalized } from 'vue-router';
import ConfirmMsgBox from '@/components/confirmMsgBox.vue';

const props = defineProps<{
    playerName:string,
    shipName:string
}>()

const currentMission = ref(1);

const APP_SERVICE : AppService = new AppService();

const OPPONENT_LIST = await APP_SERVICE.getCharacters();


let opponent:Ref<Character> = ref(OPPONENT_LIST[0]);
findNewOpponent();

let player : Ref<Character> = ref({
    id: 0, name: props.playerName, experience: 4, credit: 0,
    ship: {
        id: '0',
        name: props.shipName,
        vitality: 100
    }
});

const GameMsgRef = ref();
const quitConfirmRef = ref();

enum  GameStatus {game, win, loose, paused};

// pour savoir quoi faire quand la boite de dialog se ferme.
enum ActionsAfterClose {NEXT_MISSION, GOTO_TITLE, GOTO_SCORE};
let actionAfterClose:ActionsAfterClose;

// état de la partie :
let gameStatus:GameStatus = GameStatus.game;
let gameStatusBeforeQuitValidation:GameStatus;
let canQuit:boolean = false; // Pour savoir si on a le droit de quitter.

// Action du joueur :
function onClickAttack(){
    if (gameStatus != GameStatus.game) return; 
    switch(player.value.experience){
        case 1: {
            attack(20, opponent.value)
            break;
        }
        case 2: {
            attack(35, opponent.value)
            break;
        }
        case 3: {
            attack(50, opponent.value)
            break;
        }
        case 4: {
            attack(70, opponent.value)
            break;
        }
    
    }
    switch(opponent.value.experience){
        case 1: {
            attack(20, player.value)
            break;
        }
        case 2: {
            attack(35, player.value)
            break;
        }
        case 3: {
            attack(50, player.value)
            break;
        }
        case 4: {
            attack(70, player.value)
            break;
        }
    }

    // issue du combat.
    if (isPlayerWin()) return;
    if (isOpponentWin()) return;
}

function onClickEndMission(){
    if (gameStatus != GameStatus.game) return; 
    skipMission();
}

function skipMission(){
    if (currentMission.value == 5) 
    {
        GameMsgRef.value.showMessage({  title:"VICTOIRE !", 
                                        text:"Vous avez vaincu tous les ennemis et vous avez gagné "+ player.value.credit + " CG !",
                                        buttonText: "Voir le tableau des pointages"});
        actionAfterClose = ActionsAfterClose.GOTO_SCORE;
        return;
    }
    GameMsgRef.value.showMessage({  title:"MISSION TERMINÉ !", 
                                        text:"Vous avez terminé la mission, mais vous ne recevez pas de CG.",
                                        buttonText: "Au suivant !"});
    actionAfterClose = ActionsAfterClose.NEXT_MISSION;
}

function onClickRepair(){
    // cout : 5CG par % vie
    if (gameStatus != GameStatus.game) return;
    while(player.value.ship.vitality <100 && player.value.credit >= 5){
        player.value.ship.vitality ++;
        player.value.credit -= 5;
    }
    skipMission();
}

function attack(probability : number, characterToAttack : Character){
    if(Math.random() * 100 < probability){
        characterToAttack.ship.vitality -= Math.floor((Math.random() * 3) + 3);
    }
}

//
function isPlayerWin(){
    // On vérifie si le joueur gagne
    if (opponent.value.ship.vitality > 0) return false;

    // on change l'état du jeu
    gameStatus = GameStatus.win

    // On gagne les credit
    player.value.credit += opponent.value.credit

    // Affichage du message de victoire :
    // Message si on a fini les 5 missions.
    if (currentMission.value == 5) 
    {
        GameMsgRef.value.showMessage({  title:"VICTOIRE !", 
                                        text:"Vous avez vaincu tous les ennemis et vous avez gagné "+ player.value.credit + " CG !",
                                        buttonText: "Voir le tableau des pointages"});
        actionAfterClose = ActionsAfterClose.GOTO_SCORE;
    }
        

    // message si on a fini une mission et que l'on passe à la mission suivante.
    else
    {
        GameMsgRef.value.showMessage({  title:"VICTOIRE !", 
                                        text:"Vous avez gagné "+ opponent.value.credit + " CG !",
                                        buttonText: "Au suivant !"});  
        actionAfterClose = ActionsAfterClose.NEXT_MISSION;
    }
        
    opponent.value.credit = 0
    return true;
}

function isOpponentWin(){
    if (player.value.ship.vitality > 0) return false;

    // on change l'état du jeu
    gameStatus = GameStatus.loose

    // Affichage du message de victoire :
    GameMsgRef.value.showMessage({  title:"PERDU !", 
                                    text:"Vous êtes mort. ",
                                    buttonText: "Retour à l'accueil"});  
    actionAfterClose = ActionsAfterClose.GOTO_TITLE
}

// Gestions des emits de GameMsg
function onEmitClose(){
    
    switch(actionAfterClose){

        case ActionsAfterClose.NEXT_MISSION :
            findNewOpponent();
            currentMission.value ++;
            gameStatus = GameStatus.game;
            break;

        case ActionsAfterClose.GOTO_TITLE :
            canQuit = true;
            router.push({name:'home'});
            break;

        case ActionsAfterClose.GOTO_SCORE :
            canQuit = true;
            APP_SERVICE.postScore(player.value.name, player.value.credit)
            router.push({name:'score'});
            break;
    }
}

function findNewOpponent(){      
    let validOpponent = false;
    let newOpponent : Character = OPPONENT_LIST[0];
    while (!validOpponent){
        newOpponent = OPPONENT_LIST[Math.trunc(Math.random() * OPPONENT_LIST.length)]; 
        validOpponent = newOpponent.ship.vitality > 0;
    }         
    opponent.value = newOpponent;
}

// Message de confirmation en cas de changement de page :
let nextPage:RouteLocationNormalized;
onBeforeRouteLeave((to, from, next) => {

    if (canQuit){
        next()
    }
    else{
        nextPage = to;
        quitConfirmRef.value.showMessage("Attention", "Si vous quittez la partie, votre progression sera effacée, voulez vous vraiment quitter ?")
        gameStatusBeforeQuitValidation = gameStatus;
        gameStatus = GameStatus.paused;
        next(false);
    }
   
})

function cancelQuit(){
    gameStatus = gameStatusBeforeQuitValidation;
    canQuit = false;
}

function validQuit(){
    canQuit=true;
    router.push(nextPage)
}
</script>

<template>
    <div class="container w-100">
        <div class="row">
            <Actions class="col m-3" @attack="onClickAttack" @end-mission="onClickEndMission" @repair="onClickRepair"/>
            <Missions class="col m-3" :currentMission="currentMission" />
        </div>
        <div class="row">
            <PlayerInfos :playerName="player.name" :shipName="shipName" :nbGalacticCredits="player.credit" :experience="player.experience" :vitality="player.ship.vitality"  class="col m-3"/>
            <PlayerInfos :playerName="opponent.name" :shipName="opponent.ship.name" :nbGalacticCredits="opponent.credit" :experience="opponent.experience" :vitality="opponent.ship.vitality" class="col m-3"/>
        </div>
        <div class="row">
            <GameMsg ref="GameMsgRef" @close="onEmitClose"/>
            <ConfirmMsgBox ref="quitConfirmRef" @ok="validQuit()" @cancel="cancelQuit()"/>
        </div>
    </div>
</template>

<style scoped>
</style>