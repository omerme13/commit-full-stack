import express from 'express'
import { fruitsRouter } from './routes/fruits.js'

const PORT = Number(process.env.PORT ?? 3001)

const app = express()

app.use('/api/fruits', fruitsRouter)

app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`)
})
