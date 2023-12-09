const express = require('express');
const { authenticateJWT } = require('../middleWare/authMiddleware');

const router = express.Router();

// Protected route
router.get('/protected', authenticateJWT, (req, res) => {
  res.json({ message: 'This is a protected route', user: req.user });
});

module.exports = router;