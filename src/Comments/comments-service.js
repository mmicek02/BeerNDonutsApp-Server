const CommentsService = {
    getAllComments(knex) {
      return knex.select('*').from('beerndonuts_comments')
    },
  
    insertComment(knex, newComment) {
      return knex
        .insert(newComment)
        .into('beerndonuts_comments')
        .returning('*')
        .then(rows => {
          return rows[0]
        })
    },
  
    getById(knex, id) {
      return knex
        .from('beerndonuts_comments')
        .select('*')
        .where('id', id)
        .first()
    },
  
    deleteComment(knex, id) {
      return knex('beerndonuts_comments')
        .where({ id })
        .delete()
    },
  
    updateComment(knex, id, newCommentFields) {
      return knex('beerndonuts_comments')
        .where({ id })
        .update(newCommentFields)
    },
  }
  
  module.exports = CommentsService