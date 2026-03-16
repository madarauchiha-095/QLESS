const express = require('express');
const router = express.Router();
const {
  createToken,
  createEmergencyToken,
  callNext,
  completeToken,
  getStatus
} = require('../controllers/tokenController');

// Token management routes
router.post('/', createToken);
router.post('/emergency', createEmergencyToken);
router.post('/next', callNext);
router.post('/complete', completeToken);
router.get('/status', getStatus);

module.exports = router;
