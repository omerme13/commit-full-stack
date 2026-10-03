import { Router } from 'express'
import { fruits } from '../data/fruits.js'

export const fruitsRouter = Router()

fruitsRouter.get('/', (_req, res) => {
  res.json(fruits)
})
