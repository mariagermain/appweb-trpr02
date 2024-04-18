import { rest } from 'msw'
import { ships } from '../data/ships'

const API_URL:string = 'http://localhost:3000';

export const getShips = [
    rest.get(`${API_URL}/ships/*`, (req, res, ctx) => {
        return res(ctx.status(200), ctx.json(ships))
      }),
]
