/* eslint-disable no-console */
const express = require('express')
const dotenv = require('dotenv')
const mongoose = require('mongoose')
const path = require('path')
const cookieParser = require('cookie-parser')

// internal imports
const routers = require('./routers/routers')
const { notFoundHandler, errorHandler } = require('./middlewares/common/errorHandler')

const app = express()
dotenv.config()

// database connection
mongoose.connect(process.env.MONGO_CONNECTION_STRING, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('database connection successful'))
  .catch((err) => console.log(err))

// request parser
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// set view engine
app.set('view engine', 'ejs')

// set public folder
app.use(express.static(path.join(`${__dirname},'public'`)))

// parser cookies
app.use(cookieParser(process.env.COOKIE_SECRET))

// routing setup
app.use(routers)

// 404 not found
app.use(notFoundHandler)

// error handling
app.use(errorHandler)

app.listen(process.env.PORT, () => {
  console.log(`app listening to port ${process.env.PORT}`)
})
