import type { NextFunction, Request, Response } from 'express'
import { HttpError } from '../errors/HttpError.js'

export function notFound(req: Request, _res: Response, next: NextFunction) {
  next(new HttpError(404, `Route ${req.method} ${req.originalUrl} not found`))
}

// Express identifies error handlers by their 4-arg signature, so `_next` must stay.
export function errorHandler(err: unknown, _req: Request, res: Response, _next: NextFunction) {
  if (err instanceof HttpError) {
    res.status(err.status).json({ message: err.message })
    return
  }
  console.error(err)
  res.status(500).json({ message: 'Internal server error' })
}
