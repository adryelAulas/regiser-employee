require('dotenv').config()

const routes = require('./routes')

const express = require('express')

const app = express()

app.use(express.json())


app.use(routes)

app.listen(8080, () => console.log('Server port 8080'))
