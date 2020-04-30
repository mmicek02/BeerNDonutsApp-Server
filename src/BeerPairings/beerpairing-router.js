const express = require('express')
const BeerPairingService = require('./beerpairing-service')

const beerPairingRouter = express.Router()

beerPairingRouter
  .route('/')
  .get((req, res, next) => {
    BeerPairingService.getAllBeerPairings(req.app.get('db'))
      .then(beers => {
        console.log(beers)
        res.json(beers.map(BeerPairingService.serializeBeerPairings))
      })
      .catch(next)
  })

beerPairingRouter
  .route('/:beer_id')
  .all(checkBeerPairingExists)
  .get((req, res) => {
    res.json(BeerPairingService.serializeBeerPairings(res.beer))
  })

beerPairingRouter.route('/:beer_id/comments/')
  .all(checkBeerPairingExists)
  .get((req, res, next) => {
    BeerPairingService.getCommentsForBeer(
      req.app.get('db'),
      req.params.beer_id
    )
      .then(comments => {
        res.json(comments.map(BeerPairingService.serializeBeerPairingsComment))
      })
      .catch(next)
  })

/* async/await syntax for promises */
async function checkBeerPairingExists(req, res, next) {
  try {
    const beer = await BeerPairingService.getById(
      req.app.get('db'),
      req.params.beer_id
    )

    if (!beer)
      return res.status(404).json({
        error: `Beer and Donut Pairing doesn't exist`
      })

    res.beer = beer
    next()
  } catch (error) {
    next(error)
  }
}

module.exports = beerPairingRouter
