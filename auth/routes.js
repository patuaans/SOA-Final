const usersRouter = require('./routes/usersRouter')

const setupRoutes = (app) => {
    app.use('/users', usersRouter)
}

module.exports = setupRoutes;