require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const helmet = require('helmet')

const { NODE_ENV } = require('./config')
const commentRouter = require('./Comments/comments-router')
const beerPairingRouter = require('./BeerPairings/beerpairing-router')

const cors = require('cors');
const {CLIENT_ORIGIN} = require('./config');

const app = express()

const morganOption = (NODE_ENV === 'production')
  ? 'tiny'
  : 'common';

app.use(morgan(morganOption))
app.use(helmet())

app.get('/', (req, res) => {
    res.send('Hello, world!')
})

app.use('/api/comments', commentRouter)
app.use('/api/beerpairings', beerPairingRouter)

app.use(
    cors({
        origin: CLIENT_ORIGIN
    })
);

app.use(function errorHandle(error, req, res, next) {
    let response
    if (NODE_ENV === 'production') {
        response = { error: { message: 'server error' } }
    } else {
        console.error(error)
        response = { message: error.message, error }
    }
    res.status(500).json(response)
})

module.exports = app