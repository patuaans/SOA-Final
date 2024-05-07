const booksRouter = require('./routes/booksRouter')
// const usersRouter = require('./routes/usersRouter')

const setupRoutes = (app) => {
    app.get('/', (req, res) => {
        res.send('Welcome to the BooksLover!')
    })

    app.use('/books', booksRouter)
    // app.use('/users', usersRouter)
}

module.exports = setupRoutes;