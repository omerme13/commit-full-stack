import express from 'express'
import { errorHandler, notFound } from './middleware/errors.js'
import { fruitsRouter } from './routes/fruits.routes.js'

const PORT = Number(process.env.PORT ?? 3001)

const app = express()

app.use('/api/fruits', fruitsRouter)

app.use(notFound)
app.use(errorHandler)

app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`)
})
