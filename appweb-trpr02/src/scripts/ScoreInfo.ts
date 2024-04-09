export class ScoreInfo{
    private position:number;
    private playerName:string;
    private score:number;

    constructor(position:number,playerName:string, score:number){
        this.position = position;
        this.playerName = playerName;
        this.score = score;
    }

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