const usersRouter = require('./routes/usersRouter')
const { cookieJwtAuth } = require('./middleware/jwtAuth')

const setupRoutes = (app) => {
    app.get('/', cookieJwtAuth, (req, res) => {
        res.render('index', { user: req.user})
    })

    app.get('/login', (req, res) => {
        res.render('login')
    })

    app.use('/users', usersRouter)
}

module.exports = setupRoutes;