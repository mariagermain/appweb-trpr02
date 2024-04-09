import axios, { type AxiosResponse } from 'axios';
<<<<<<< Updated upstream
import { type Ship, type ScoreInfo } from "./src/scripts/Types"
=======
import { type Ship } from "./src/scripts/Ship"
import { ScoreInfo } from "./src/scripts/ScoreInfo"
>>>>>>> Stashed changes


const SHIPS_PATH = "/ships"
const SCORES_PATH = "/ranking"

export default class AppService {
    API_URL: string

    constructor () {
        this.API_URL = 'http://localhost:3000'
    }

    async getShips () : Promise<Ship[]> {
        const { data } : AxiosResponse<Ship[], undefined> = await axios.get(this.API_URL + SHIPS_PATH);
        return data;
    }

    async getScores() : Promise<ScoreInfo[]>{
        const { data } : AxiosResponse<ScoreInfo[],any> = await axios.get(this.API_URL + SCORES_PATH);
        return data;
    }

}