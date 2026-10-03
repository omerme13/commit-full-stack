import type { Request, Response } from 'express'
import { HttpError } from '../errors/HttpError.js'
import { findFruits } from '../services/fruits.service.js'

const MAX_QUERY_LENGTH = 50

export function getFruits(req: Request, res: Response) {
  const { q = '' } = req.query

  // ?q=a&q=b arrives as an array; anything other than a single string is invalid.
  if (typeof q !== 'string') {
    throw new HttpError(400, '"q" must be a single string')
  }
  if (q.length > MAX_QUERY_LENGTH) {
    throw new HttpError(400, `"q" must be at most ${MAX_QUERY_LENGTH} characters`)
  }

  res.json(findFruits(q))
}
