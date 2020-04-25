const { expect } = require('chai')
const knex = require('knex')
const app = require('../src/app')

describe('Comments Endpoints', function() {
    let db 

    before ('make knex instance', () => {
        db = knex({
            client: 'pg',
            connection: process.env.TEST_DATABASE_URL,
        })
        app.set('db', db)
    })

    after('disconnect from db', () => db.destroy())

    before('clean the table', () => db('beerndonuts_comments').truncate())
})