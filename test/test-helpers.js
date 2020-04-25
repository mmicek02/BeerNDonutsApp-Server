function makeBeersArray(){
    return [
        {
            id: 1,
            style: 'IPA',
            donut_pairing: 'Kronut',
        },
        {
            id: 2,
            style: 'Sour',
            donut_pairing: 'Jelly filled donut',
        },
        {
            id: 3,
            style: 'Pale_Ale',
            donut_pairing: 'Old Fashioned Donut'
        },
        {
            id: 4,
            style: 'Stout',
            donut_pairing: 'Long John'
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
    const testComments = makeCommentsArray(beers)
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

module.exports = {
    makeBeersArray,
    makeCommentsArray,
    makeExpectBeerPairing,
    makeExpectBeerPairingComments,
    
    makeBeerNDonutFixtures,
    cleanTables,
}