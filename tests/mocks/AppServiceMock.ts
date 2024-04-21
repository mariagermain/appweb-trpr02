import { ships } from '../data/ships'
import { rest } from 'msw'


const API_URL:string = 'http://localhost:3000';

export const getShips = [
    rest.get('http://localhost:3000/ships', (req, res, ctx) => {
        return res(ctx.status(200), ctx.json(ships))
      }),
]

export const networkError = [
  rest.get('http://localhost:3000/ships', (req, res, ctx) => {
    return res.networkError('Handler : Failed to connect')
  }),
]

