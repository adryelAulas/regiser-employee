require('dotenv').config()

const routes = require('./routes')
const cors = require('cors')
const express = require('express')
const app = express()
const port = process.env.PORT || 3001;

app.use(express.json())

app.use(cors())

app.use(routes)

app.listen(port, () => console.log(`Server port ${port}`))
