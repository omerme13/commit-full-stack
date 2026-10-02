import express from 'express'
import type { NextFunction, Request, Response } from 'express'
import { fruitsRouter } from './routes/fruits.ts'

const PORT = Number(process.env.PORT ?? 3001)

const app = express()

app.use('/api/fruits', fruitsRouter)

app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
  console.error(err.stack)
  res.status(500).json({ error: 'Internal Server Error' })
})

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`)
})
