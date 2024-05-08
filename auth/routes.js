const usersRouter = require('./routes/usersRouter')
const { cookieJwtAuth } = require('./middleware/jwtAuth')

const setupRoutes = (app) => {
    
    app.get('/login', (req, res) => {
        res.json()
    })

    app.use('/users', usersRouter)
}

module.exports = setupRoutes;