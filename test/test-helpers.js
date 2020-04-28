function makeBeersArray(){
    return [
        {
            id: 1,
            style: 'IPA',
            donut_pairing: 'Kronut',
            tasting_notes: 'PLACEHOLDER TEXT',
        },
        {
            id: 2,
            style: 'Sour',
            donut_pairing: 'Jelly filled donut',
            tasting_notes: 'PLACEHOLDER TEXT',
        },
        {
            id: 3,
            style: 'Pale_Ale',
            donut_pairing: 'Old Fashioned Donut',
            tasting_notes: 'PLACEHOLDER TEXT',
        },
        {
            id: 4,
            style: 'Stout',
            donut_pairing: 'Long John',
            tasting_notes: 'PLACEHOLDER TEXT',
        }
    ];
}

function makeCommentsArray(beers) {
    return [
        {
            id: 1,
            text: 'First comment - this is test',
            beer_id: beers[0].id,
            date_created: new Date('2029-01-22T16:28:32.615Z')
        },
        {
            id: 2,
            text: 'First comment - this is test',
            beer_id: beers[0].id,
            date_created: new Date('2029-01-22T16:28:32.615Z')
        },
        {
            id: 3,
            text: 'First comment - this is test',
            beer_id: beers[0].id,
            date_created: new Date('2029-01-22T16:28:32.615Z')
        },
        {
            id: 4,
            text: 'First comment - this is test',
            beer_id: beers[beers.length - 1].id,
            date_created: new Date('2029-01-22T16:28:32.615Z')
        },
        {
            id: 5,
            text: 'First comment - this is test',
            beer_id: beers[beers.length - 1].id,
            date_created: new Date('2029-01-22T16:28:32.615Z')
        },
        {
            id: 6,
            text: 'First comment - this is test',
            beer_id: beers[beers.length - 1].id,
            date_created: new Date('2029-01-22T16:28:32.615Z')
        },
        {
            id: 7,
            text: 'First comment - this is test',
            beer_id: beers[beers.length - 1].id,
            date_created: new Date('2029-01-22T16:28:32.615Z')
        },
    ];
}
function makeExpectBeerPairing(beer, comments=[]) {
    const number_of_comments = comments
        .filter(comment => comment.beer_id === beer.id)
        .length
    
    return {
        id: beer.id,
        style: beer.style,
        number_of_comments,
    }
}

function makeExpectBeerPairingComments(beerId, comments) {
    const expectedComments = comments
        .filter(comment => comment.beer_id === beerId)
    
    return expectedComments.map(comment => {
        return {
            id: comment.id,
            text: comment.text,
            date_created: comment.date_created.toISOString(),
        }
    })
}

function makeBeerNDonutFixtures() {
    const testBeers = makeBeersArray()
    const testComments = makeCommentsArray(testBeers)
    return { testBeers, testComments }
}

function cleanTables(db) {
    return db.transaction(trx =>
        trx.raw(
            `TRUNCATE
                beerndonuts_beers,
                beerndonuts_comments`
        )
        .then(() => 
            Promise.all([
                trx.raw(`ALTER SEQUENCE beerndonuts_beers_id_seq minvalue 0 START WITH 1`),
                trx.raw(`ALTER SEQUENCE beerndonuts_comments_id_seq minvalue 0 START WITH 1`),
                trx.raw(`SELECT setval ('beerndonuts_beers_id_seq', 0)`),
                trx.raw(`SELECT setval ('beerndonuts_comments_id_seq', 0)`),
            ])
        )
    )
}

function seedBeersTables(db, beers, comments=[]) {
    // use a transaction to group the queries and auto rollback on any failure
    return db.transaction(async trx => {
      await trx.into('beerndonuts_beers').insert(beers)
      // update the auto sequence to match the forced id values
      await trx.raw(
        `SELECT setval('beerndonuts_beers_id_seq', ?)`,
        [beers[beers.length - 1].id],
      )
      // only insert comments if there are some, also update the sequence counter
      if (comments.length) {
        await trx.into('beerndonuts_comments').insert(comments)
        await trx.raw(
          `SELECT setval('beerndonuts_comments_id_seq', ?)`,
          [comments[comments.length - 1].id],
        )
      }
    })
  }

module.exports = {
    makeBeersArray,
    makeCommentsArray,
    makeExpectBeerPairing,
    makeExpectBeerPairingComments,
    
    makeBeerNDonutFixtures,
    cleanTables,
    seedBeersTables,
}