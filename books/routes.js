const booksRouter = require('./routes/booksRouter')
const genresRouter = require('./routes/genresRouter')
const reportsRouter = require('./routes/reportsRouter')
const authorsRouter = require('./routes/authorsRouter')
const bookShelfRouter = require('./routes/bookShelfRouter')

const setupRoutes = (app) => {
    app.get('/', (req, res) => {
        res.send('Welcome to the BooksLover!')
    })

    app.use('/books', booksRouter)
    app.use('/authors', authorsRouter)
    app.use('/genres', genresRouter)
    app.use('/reports', reportsRouter)
    app.use('/bookshelf', bookShelfRouter)
}

module.exports = setupRoutes;