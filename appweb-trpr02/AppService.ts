import axios, { type AxiosResponse } from 'axios';
import { type Ship, type ScoreInfo } from "./src/scripts/Types"


const SHIPS_PATH : string = "/ships"
const SCORES_PATH : string = "/ranking"

export default class AppService {
    API_URL: string

    constructor () {
        this.API_URL = 'http://localhost:3000'
    }

    async getShips () : Promise<Ship[]> {
        const { data } : AxiosResponse<Ship[], Ship[]> = await axios.get(this.API_URL + SHIPS_PATH);
        return data;
    }

    async getScores() : Promise<ScoreInfo[]>{
        const { data } : AxiosResponse<ScoreInfo[], ScoreInfo[]> = await axios.get(this.API_URL + SCORES_PATH);
        return data;
    }

}