const express = require('express')
const path = require('path')
const CommentService = require('./comments-service')

const commentsRouter = express.Router()
const jsonBodyParser = express.json()

commentsRouter
    .route('/')
    .post(jsonBodyParser, (req, res, next) => {
        const { beer_id, text } = req.body
        const newComment = { beer_id, text }

        for (const [key, value] of Object.entries(newComment))
            if (value == null)
                return res.status(400).json({
                    error: `Missing '${key}' in request body`
                })
        
        newComment.id = req.beer_id

        CommentService.insertComment(
            req.app.get('db'),
            newComment
        )
            .then(comment => {
                res
                    .status(201)
                    .location(`/api/comments/${comment.id}`)
                    .json(comment)
            })
            .catch(next)
    })
module.exports = commentsRouter