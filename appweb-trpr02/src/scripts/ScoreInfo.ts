export class ScoreInfo{
    playerName:string;
    score:number;

    constructor(playerName:string, score:number){
        this.playerName = playerName;
        this.score = score;
    }

    getPlayerName(){
        return this.playerName;
    }

    getScore(){
        return this.score;
    }
}