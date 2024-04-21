export type ScoreInfo = {
    id:number,
    name:string,
    score:number
}

export type ShipName = {
    id:string,
    name:string
}

export type Ship = {
    id:string,
    name:string,
    vitality:number
}

export type Player = {
    name:string,
    maxHealth:number,
    credit:number,

}

export type Character = {
    id:number,
    name:string,
    credit:number,
    experience:number,
    ship:Ship
}
