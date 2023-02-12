import express from 'express'
import cors from 'cors'
import * as dotenv from 'dotenv'
import mongoose from 'mongoose'
import { router } from './router.js'
import serverless from 'serverless-http'

dotenv.config()

const app = express()

app.use(express.static('public')) 
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors({ 
	origin: ['http://localhost:3000', 'http://localhost:3500'],
	credentials: true
}))
app.use(router)

try {
	mongoose.set("strictQuery", false)
	mongoose.connect(process.env.DATABASE_URL, { dbName: 'store' }).then(() => console.log('Connect to DB'))
} catch(e) {
	console.log(e)
}

app.use('./netlify/functions/api', router)

// app.listen(process.env.PORT, () => console.log('SERVER IS RUNNING'))

export const handler = serverless(app)