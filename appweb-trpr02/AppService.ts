import axios, { type AxiosResponse } from 'axios';
import { Ship } from "./src/scripts/Ship"
import { ScoreInfo } from "./src/scripts/ScoreInfo"


const SHIPS_PATH = "/ships"
const SCORES_PATH = "/scores"

export default class AppService {
    API_URL: string

    constructor () {
        this.API_URL = 'http://localhost:3000'
    }

    async getShips () : Promise<Ship[]>{
        const { data } : AxiosResponse<any,any> = await axios.get(this.API_URL + SHIPS_PATH);
        return data;
    }

    async getScores() : Promise<ScoreInfo[]>{
        const { data } : AxiosResponse<any,any> = await axios.get(this.API_URL + SCORES_PATH);
        return data;
    }

}