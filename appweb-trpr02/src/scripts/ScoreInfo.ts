export class ScoreInfo{
    position:number;
    playerName:string;
    score:number;

    constructor(position:number,playerName:string, score:number){
        this.position = position;
        this.playerName = playerName;
        this.score = score;
    }

<<<<<<< HEAD
    getPosition(){
        return this.position;
    }

    setPosition(position:number)
    {
        this.position = position;
    }

    getPlayerName():string{
        return this.playerName;
    }

    getScore() :  number{
        return this.score;
    }
}