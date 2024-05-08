require('dotenv').config()
const express = require('express')
const connectDB = require('./config/db')
const setupRoutes = require('./routes')
const cors = require('cors')

const app = express()
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.set('view engine', 'ejs')

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