const express = require('express')
const router = express.Router()

const { logon, hello } = require('../controllers/main')
const authenticate = require('../middleware/auth')

// public route
router.post('/logon', logon)

// protected route
router.get('/hello', authenticate, hello)

module.exports = router