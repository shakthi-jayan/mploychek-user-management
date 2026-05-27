import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import router from './routes/userRoutes.js'
import cors from 'cors'

dotenv.config()
const app = express()
app.use(cors())
app.use(express.json())
app.use('/api/users', router)

const mongoURI = process.env.MONGO_URI

mongoose.connect(mongoURI)
  .then(() => {
    console.log('Connected to MongoDB')
  })
  .catch((err) => {
    console.log(err)
  })

export default app