require('dotenv').config()
const express = require('express')
const connectDB = require('./config/db')
const setupRoutes = require('./routes')
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express()
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(bodyParser.json());
app.use(cookieParser());
app.set('view engine', 'ejs')
app.use(express.static('public'))

setupRoutes(app)

const startServer = async () => {
    try {
        await connectDB()
        app.listen(process.env.PORT, () => {
            console.log(`Server is running on port ${process.env.PORT}`)
        })
    } catch (error) {
        console.error(error)
    }
}

startServer()