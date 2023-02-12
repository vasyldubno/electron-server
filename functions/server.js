import express from 'express'
import cors from 'cors'
import * as dotenv from 'dotenv'
import mongoose from 'mongoose'
import { router } from '../router.js'
dotenv.config()
import serverless from 'serverless-http'

const app = express()

app.use(express.static('public')) 
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors({ 
	origin: ['http://localhost:3000', 'http://localhost:3500'],
	credentials: true
}))
app.use(router)

app.use('/.netlify/functions/server', router)
app.use('/', (req, res) => res.send('Hello'))

try {
	mongoose.set("strictQuery", false)
	mongoose.connect(process.env.DATABASE_URL, { dbName: 'store' }).then(() => console.log('Connect to DB'))
} catch(e) {
	console.log(e)
}

// app.listen(process.env.PORT, () => console.log(`Server is running on http://localhost:${process.env.PORT}`))

export default app
export const handler = serverless(app)
// module.exports.handler = serverless(app)


