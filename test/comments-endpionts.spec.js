const knex = require('knex')
const app = require('../src/app')
const helpers = require('./test-helpers')

describe('Comments Endpoints', function() {
  let db

  const {
    testBeers,
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

  describe(`POST /api/comments`, () => {
    beforeEach('insert articles', () =>
      helpers.seedBeersTables(
        db,
        testBeers,
      )
    )

    it(`creates an comment, responding with 201 and the new comment`, function() {
      this.retries(3)
      const testBeer = testBeers[0]
      const newComment = {
        text: 'Test new comment',
        beer_id: testBeer.id,
      }
      return supertest(app)
        .post('/api/comments')
        .send(newComment)
        .expect(201)
        .expect(res => {
          expect(console.log(newComment))
          expect(res.body).to.have.property('id')
          expect(res.body.text).to.eql(newComment.text)
          expect(res.body.beer_id).to.eql(newComment.beer_id)
          expect(res.headers.location).to.eql(`/api/comments/${res.body.id}`)
          const expectedDate = new Date().toLocaleString('en', { timeZone: 'UTC' })
          const actualDate = new Date(res.body.date_created).toLocaleString()
          expect(actualDate).to.eql(expectedDate)
        })
        .expect(res =>
          db
            .from('beerndonuts_comments')
            .select('*')
            .where({ id: res.body.id })
            .first()
            .then(row => {
              expect(row.text).to.eql(newComment.text)
              expect(row.beer_id).to.eql(newComment.beer_id)
              expect(row.user_id).to.eql(testUser.id)
              const expectedDate = new Date().toLocaleString('en', { timeZone: 'UTC' })
              const actualDate = new Date(row.date_created).toLocaleString()
              expect(actualDate).to.eql(expectedDate)
            })
            .then(postRes =>
                supertest(app)
                    .get(`/api/comments/${postRed.body.id}`)
                    .expect(postRes.body)    
            )
        )
    })

    const requiredFields = ['text', 'beer_id']

    requiredFields.forEach(field => {
      const testBeer = testBeers[0]
      const newComment = {
        text: 'Test new comment',
        beer_id: testBeer.id,
      }

      it(`responds with 400 and an error message when the '${field}' is missing`, () => {
        delete newComment[field]

        return supertest(app)
          .post('/api/comments')
          .send(newComment)
          .expect(400, {
            error: `Missing '${field}' in request body`,
          })
      })
    })
  })
})