const express = require('express')
const { registerUser, loginUser,getMe } = require('../controllers/userCont')
const router = express.Router()
const{protect} = require('../middleWare/authMiddleware')



router.post('/register', registerUser)
router.post('/login', loginUser)
router.get('/me', protect, getMe)

module.exports = router