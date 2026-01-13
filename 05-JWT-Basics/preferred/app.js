const express = require('express')
const dotenv = require('dotenv')

// load environment variables
dotenv.config()

const app = express()

// middleware to parse JSON
app.use(express.json())

// routes
const authRoutes = require('./routes/auth')
app.use('/api/v1', authRoutes)

// start server
const port = process.env.PORT || 3000
app.listen(port, () => {
  console.log(`Server running on port ${port}`)
})
