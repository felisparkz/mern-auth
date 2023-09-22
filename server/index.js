const express = require('express')
const dotenv = require('dotenv').config()
const cors = require('cors')
const mongoose = require('mongoose')
const cookieParser = require('cookie-parser')

const app = express()


//database connection
mongoose.connect(process.env.MONGO_URL)
.then(() => console.log('Database is connected'))
.catch((err) => console.log('Database is not connected', err))


const port = 8000

//middleware
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({extended: false}));


app.use('/', require('./routes/authRoutes'))

app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})