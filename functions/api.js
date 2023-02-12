import express from 'express'
import serverless from 'serverless-http'

const app = express()

app.use(express.static('public')) 
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors({ 
	origin: ['http://localhost:3000', 'http://localhost:3500'],
	credentials: true
}))

const router = express.Router()
router.get('/test', (req, res) => {
  return res.json({ message: 'message'})
})

app.use('./netlify/functions/api', router)

export const handler = serverless(app)