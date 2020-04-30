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

    describe.only(`GET /api/beerpairings`, () => {
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
})
