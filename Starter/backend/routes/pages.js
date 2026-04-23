const express = require('express');
const router = express.Router();

// Simple placeholder route for homepage
router.get('/', (req, res) => {
  res.send('Backend is running correctly!');
});

module.exports = router;
