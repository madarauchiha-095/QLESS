const {
  generateToken,
  callNextToken,
  completeCurrentToken,
  addEmergencyToken,
  getQueueState
} = require('../services/queueService');


/**
 * Create a new token (Web + SMS)
 */
const createToken = async (req, res) => {
  try {
    const {
      phone_number,
      priority,
      name,
      age,
      problem,
      source
    } = req.body;

    if (!phone_number) {
      return res.status(400).json({
        success: false,
        error: 'Phone number is required'
      });
    }

    const token = await generateToken(
      phone_number,
      priority || 2,
      {
        name,
        age,
        problem,
        source
      }
    );

    res.status(201).json({
      success: true,
      data: {
        id: token.id,
        token_number: token.token_number,
        phone_number: token.phone_number,
        name: token.name,
        age: token.age,
        problem: token.problem,
        source: token.source,
        status: token.status,
        priority: token.priority,
        estimated_time: token.estimated_time
      }
    });

  } catch (error) {
    console.error('Error creating token:', error);
    res.status(error.status || 500).json({
      success: false,
      error: error.message || 'Failed to create token'
    });
  }
};


/**
 * Create an emergency token
 */
const createEmergencyToken = async (req, res) => {
  try {
    const {
      phone_number,
      name,
      age,
      problem,
      source
    } = req.body;

    if (!phone_number) {
      return res.status(400).json({
        success: false,
        error: 'Phone number is required'
      });
    }

    const token = await addEmergencyToken(
      phone_number,
      {
        name,
        age,
        problem,
        source
      }
    );

    res.status(201).json({
      success: true,
      data: {
        id: token.id,
        token_number: token.token_number,
        phone_number: token.phone_number,
        name: token.name,
        age: token.age,
        problem: token.problem,
        source: token.source,
        status: token.status,
        priority: token.priority,
        estimated_time: token.estimated_time
      }
    });

  } catch (error) {
    console.error('Error creating emergency token:', error);
    res.status(error.status || 500).json({
      success: false,
      error: error.message || 'Failed to create emergency token'
    });
  }
};


/**
 * Call the next token from queue
 */
const callNext = async (req, res) => {
  try {
    const token = await callNextToken();

    if (!token) {
      return res.status(404).json({
        success: false,
        error: 'No tokens in queue'
      });
    }

    res.json({
      success: true,
      data: {
        id: token.id,
        token_number: token.token_number,
        phone_number: token.phone_number,
        name: token.name,
        age: token.age,
        problem: token.problem,
        source: token.source,
        status: token.status,
        priority: token.priority
      }
    });

  } catch (error) {
    console.error('Error calling next token:', error);
    res.status(error.status || 500).json({
      success: false,
      error: error.message || 'Failed to call next token'
    });
  }
};


/**
 * Complete the current token
 */
const completeToken = async (req, res) => {
  try {
    const token = await completeCurrentToken();

    if (!token) {
      return res.status(404).json({
        success: false,
        error: 'No token currently in progress'
      });
    }

    res.json({
      success: true,
      data: {
        id: token.id,
        token_number: token.token_number,
        phone_number: token.phone_number,
        name: token.name,
        age: token.age,
        problem: token.problem,
        source: token.source,
        status: token.status
      }
    });

  } catch (error) {
    console.error('Error completing token:', error);
    res.status(error.status || 500).json({
      success: false,
      error: error.message || 'Failed to complete token'
    });
  }
};


/**
 * Get queue status
 */
const getStatus = async (req, res) => {
  try {
    const queueState = await getQueueState();

    res.json({
      success: true,
      data: queueState
    });

  } catch (error) {
    console.error('Error getting queue status:', error);
    res.status(error.status || 500).json({
      success: false,
      error: error.message || 'Failed to get queue status'
    });
  }
};


module.exports = {
  createToken,
  createEmergencyToken,
  callNext,
  completeToken,
  getStatus
};
