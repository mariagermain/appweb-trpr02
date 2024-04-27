import { ships } from '../data/ships'
import { ranking } from '../data/ranking'
import { characters } from '../data/characters'
import { rest } from 'msw'


const API_URL:string = 'http://localhost:3000';

export const getShips = [
    rest.get('http://localhost:3000/ships', (req, res, ctx) => {
        return res(ctx.status(200), ctx.json(ships));
      }),
]

export const networkError = [
  rest.get(`http://localhost:3000/*`, (req, res, ctx) => {
    return res.networkError('Handler : Failed to connect');
  }),
]

export const getScores = [
  rest.get('http://localhost:3000/ranking', (req, res, ctx) =>{
  return res(ctx.status(200), ctx.json(ranking));
  }),
]

export const getCharacters = [
  rest.get("http://127.0.0.1:3000/characters", (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(characters));
  }),
]

export const getCharacter = [
  rest.get("http://127.0.0.1:3000/characters", (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(characters[1]));
  }),
]
