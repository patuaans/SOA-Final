const booksRouter = require('./routes/booksRouter')
const genresRouter = require('./routes/genresRouter')

const setupRoutes = (app) => {
    app.get('/', (req, res) => {
        res.send('Welcome to the BooksLover!')
    })

    app.use('/books', booksRouter)
    app.use('/genres', genresRouter)
}

module.exports = setupRoutes;