import { Router } from 'express'
import { getFruits } from '../controllers/fruits.controller.js'

export const fruitsRouter = Router()

fruitsRouter.get('/', getFruits)
