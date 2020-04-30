const knex = require('knex')
const app = require('../src/app')
const helpers = require('./test-helpers')

describe('BeerPairing Endpoints', function() {
    let db 

    const {
        testBeers,
        testComments
    } = helpers.makeBeerNDonutFixtures()
    
    before('make knex instance', () => {
        db = knex({
            client: 'pg',
            connection: process.env.TEST_DATABASE_URL,
        })
        app.set('db', db)
    })

    after('disconnect from db', () => db.destroy())

    before('cleanup', () => helpers.cleanTables(db))
  
    afterEach('cleanup', () => helpers.cleanTables(db))

    describe(`GET /api/beerpairings`, () => {
        context(`Given no beer and donut pairings`, () => {
          it(`responds with 200 and an empty list`, () => {
            return supertest(app)
              .get('/api/beerpairings')
              .expect(200, [])
          })
        })
    
        context('Given there are beer and donut pairing in the database', () => {
          beforeEach('insert beer and donut pairing', () =>
            helpers.seedBeersTables(
              db,
              testBeers,
              testComments,
            )
          )
    
          it('responds with 200 and all of the beer and donut pairings', () => {
            const expectedBeerPairings = testBeers.map(beer =>
              helpers.makeExpectBeerPairing(
                beer,
                testComments,
              )
            )
            return supertest(app)
              .get('/api/beerpairings')
              .expect(200, expectedBeerPairings)
          })
        })
    })

    describe(`GET /api/beerpairings/:beer_id`, () => {
        context(`Given no beer and donut pairings`, () => {
          it(`responds with 404`, () => {
            const beerId = 123456
            return supertest(app)
              .get(`/api/beerpairings/${beerId}`)
              .expect(404, { error: `Beer and Donut Pairing doesn't exist` })
          })
        })
    
        context('Given there are beer and donut pairings in the database', () => {
          beforeEach('insert Beers and Donut Pairings', () =>
            helpers.seedBeersTables(
              db,
              testBeers,
              testComments,
            )
          )
    
          it('responds with 200 and the specified beer and donut pairing', () => {
            const beerId = 2
            const expectedBeer = helpers.makeExpectBeerPairing(
              testBeers[beerId - 1],
              testComments,
            )
    
            return supertest(app)
              .get(`/api/beerpairings/${beerId}`)
              .expect(200, expectedBeer)
          })
        })
    })

    describe(`GET /api/beerpairings/:beer_id/comments`, () => {
        context(`Given no beers`, () => {

          it(`responds with 404`, () => {
            const beerId = 123456
            return supertest(app)
              .get(`/api/beerpairings/${beerId}/comments`)
              .expect(404, { error: `Beer and Donut Pairing doesn't exist` })
          })
        })
    
        context('Given there are comments for beer and donut pairing in the database', () => {
          beforeEach('insert Beer and Donut Pairings', () =>
            helpers.seedBeersTables(
              db,
              testBeers,
              testComments,
            )
          )
    
          it('responds with 200 and the specified comments', () => {
            const beerId = 1
            const expectedComments = helpers.makeExpectBeerPairingComments(
              beerId, 
              testComments,
            )
    
            return supertest(app)
              .get(`/api/beerpairings/${beerId}/comments`)
              .expect(200, expectedComments)
          })
        })
      })
})
