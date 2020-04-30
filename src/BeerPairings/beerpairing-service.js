const BeerPairingService = {
    getAllBeerPairings(knex) {
        return knex.select('*').from('beerndonuts_beers')
    },
    getById(knex, id) {
        return knex
          .from('beerndonuts_beers')
          .select('*')
          .where('id', id)
          .first()
    },
    getCommentsForBeer(db, beer_id) {
        return db
            .from('beerndonuts_comments AS comm')
            .select(
                'comm.id',
                'comm.text',
                'comm.date_created',
            )
            .where('comm.beer_id', beer_id)
            .groupBy('comm.id')
    },

    serializeBeerPairings(beer) {
        return {
            id: beer.id,
            number_of_comments: beer.number_of_comments,
            donut_pairing: beer.donut_pairing,
            tasting_notes: beer.tasting_notes,
            style: beer.style,
        }
    },

    serializeBeerPairingsComment(comment) {
        return {
            id: comment.id,
            beer_id: commment.beer_id,
            text: comment.text,
            date_created: new Date(comment.date_created),
        }
    },
}

module.exports = BeerPairingService