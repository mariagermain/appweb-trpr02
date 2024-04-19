import axios, { type AxiosResponse } from 'axios';
import { type ShipName, type ScoreInfo, type Character } from "./src/scripts/Types"
import { ref, type Ref } from 'vue';


const SHIPS_PATH : string = "/ships"
const SCORES_PATH : string = "/ranking"
const CHARACTERS_PATH : string = "/characters"

export default class AppService {
    API_URL : string

    constructor () {
        this.API_URL = 'http://localhost:3000'
    }

    async getShips () : Promise<ShipName[]> {
        const { data } : AxiosResponse<ShipName[], ShipName[]> = await axios.get(this.API_URL + SHIPS_PATH);
        return data;
    }

    async getScores() : Promise<ScoreInfo[]>{
        const { data } : AxiosResponse<ScoreInfo[], ScoreInfo[]> = await axios.get(this.API_URL + SCORES_PATH);
        return data;
    }

    async getCharacters() : Promise<Character[]>{
        const { data } : AxiosResponse<Character[], Character[]> = await axios.get(this.API_URL + CHARACTERS_PATH);
        return data;
    }

    async getRandomCharacter() : Promise<Character>{
        const { data } : AxiosResponse<Character[], Character[]> = await axios.get("http://127.0.0.1:3000/characters");
        const rand = Math.floor(Math.random() * await this.getNbCharacters());
        return data[rand];
    }

    async getNbCharacters() : Promise<number> {
        const { data } : AxiosResponse<Character[], Character[]> = await axios.get("http://127.0.0.1:3000/characters");
        return data.length
    }
}
