const usersRouter = require('./routes/usersRouter')
const authorsRouter = require('./routes/authorsRouter')

const setupRoutes = (app) => {
    app.use('/users', usersRouter)
    app.use('/authors', authorsRouter)
}

module.exports = setupRoutes;