const booksRouter = require('./routes/booksRouter')
const seriesRouter = require('./routes/seriesRouter')
const editionsRouter = require('./routes/editionsRouter')
const genresRouter = require('./routes/genresRouter')
const userSubmissionRouter = require('./routes/userSubmissionRouter')
const reportsRouter = require('./routes/reportsRouter')
const authorsRouter = require('./routes/authorsRouter')
const bookShelfRouter = require('./routes/bookShelfRouter')
const verificationsRouter = require('./routes/verificationsRouter')

const setupRoutes = (app) => {
    app.get('/', (req, res) => {
        res.send('Welcome to the BooksLover!')
    })

    app.use('/books', booksRouter)
    app.use('/series', seriesRouter)
    app.use('/editions', editionsRouter)
    app.use('/authors', authorsRouter)
    app.use('/genres', genresRouter)
    app.use('/reports', reportsRouter)
    app.use('/bookshelf', bookShelfRouter)
    app.use('/verifications', verificationsRouter)
    app.use('/user-submissions', userSubmissionRouter)
}

module.exports = setupRoutes;