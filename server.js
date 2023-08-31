import express from 'express'
import cors from 'cors'
import * as dotenv from 'dotenv'
import mongoose from 'mongoose'
import { router } from './router.js'
dotenv.config()

const app = express()

app.use(express.static('public')) 
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors({ 
	origin: ['https://electronshop.vercel.app/'],
	credentials: true
}))
app.use(router)

try {
	mongoose.set("strictQuery", false)
	mongoose.connect(process.env.DATABASE_URL, { dbName: 'store' }).then(() => console.log('Connect to DB'))
} catch(e) {
	console.log(e) 
}

app.listen(process.env.PORT, () => console.log(`SERVER IS RUNNING`, `http://${process.env.DOMAIN}:${process.env.PORT}`))