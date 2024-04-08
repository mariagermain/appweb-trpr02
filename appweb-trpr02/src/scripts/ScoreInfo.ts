export class ScoreInfo{
    playerName : string;
    score : number;

    constructor(playerName : string, score : number){
        this.playerName = playerName;
        this.score = score;
    }

    getPlayerName() : string{
        return this.playerName;
    }

    getScore() :  number{
        return this.score;
    }
}