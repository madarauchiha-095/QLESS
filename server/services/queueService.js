const { Op } = require('sequelize');
const Token = require('../models/Token');

// Lazy load socket to avoid circular dependency
let emitQueueUpdate = null;
const getEmitFunction = () => {
  if (!emitQueueUpdate) {
    const socketModule = require('../sockets/socket');
    emitQueueUpdate = socketModule.emitQueueUpdate;
  }
  return emitQueueUpdate;
};

/**
 * CORE QUEUE SERVICE
 * Handles:
 * - Token generation (transaction safe)
 * - Emergency insertion
 * - Queue progression
 * - Real-time emission
 * - Multi-channel support (web + sms)
 */


/**
 * Generate a new token (transaction-safe)
 * Supports extra patient details
 */
const generateToken = async (
  phone_number,
  priority = 2,
  extra = {}
) => {

  const transaction = await Token.sequelize.transaction();

  try {

    // Lock table to safely generate next token number
    const lastToken = await Token.findOne({
      order: [['token_number', 'DESC']],
      attributes: ['token_number'],
      lock: transaction.LOCK.UPDATE,
      transaction
    });

    const nextTokenNumber = lastToken
      ? lastToken.token_number + 1
      : 1;

    // Count tokens ahead
    const waitingCount = await Token.count({
      where: { status: 'waiting' },
      transaction
    });

    const inProgressCount = await Token.count({
      where: { status: 'in_progress' },
      transaction
    });

    const totalAhead = waitingCount + inProgressCount;

    const estimatedTime = new Date();
    estimatedTime.setMinutes(
      estimatedTime.getMinutes() + (totalAhead * 10)
    );

    const token = await Token.create({
      token_number: nextTokenNumber,
      phone_number,
      priority,
      status: 'waiting',
      estimated_time: estimatedTime,

      // ✅ NEW FIELDS (multi-channel support)
      name: extra?.name || null,
      age: extra?.age || null,
      problem: extra?.problem || null,
      source: extra?.source || 'web',

      created_at: new Date(),
      updated_at: new Date()

    }, { transaction });

    await transaction.commit();

    // Emit real-time update
    const emitFn = getEmitFunction();
    if (emitFn) await emitFn();

    return token;

  } catch (error) {
    await transaction.rollback();
    console.error('❌ Error generating token:', error);
    throw error;
  }
};


/**
 * Call next token safely
 */
const callNextToken = async () => {

  const transaction = await Token.sequelize.transaction();

  try {

    const existing = await Token.findOne({
      where: { status: 'in_progress' },
      transaction
    });

    if (existing) {
      const err = new Error(
        `Token #${existing.token_number} is already in progress.`
      );
      err.status = 409;
      throw err;
    }

    const nextToken = await Token.findOne({
      where: { status: 'waiting' },
      order: [
        ['priority', 'ASC'],
        ['created_at', 'ASC']
      ],
      lock: transaction.LOCK.UPDATE,
      transaction
    });

    if (!nextToken) {
      await transaction.commit();
      return null;
    }

    await nextToken.update({
      status: 'in_progress',
      updated_at: new Date()
    }, { transaction });

    await transaction.commit();

    const emitFn = getEmitFunction();
    if (emitFn) await emitFn();

    return nextToken;

  } catch (error) {
    await transaction.rollback();
    console.error('❌ Error calling next token:', error);
    throw error;
  }
};


/**
 * Complete current token
 */
const completeCurrentToken = async () => {

  const transaction = await Token.sequelize.transaction();

  try {

    const currentToken = await Token.findOne({
      where: { status: 'in_progress' },
      lock: transaction.LOCK.UPDATE,
      transaction
    });

    if (!currentToken) {
      await transaction.commit();
      return null;
    }

    await currentToken.update({
      status: 'completed',
      updated_at: new Date()
    }, { transaction });

    await transaction.commit();

    const emitFn = getEmitFunction();
    if (emitFn) await emitFn();

    return currentToken;

  } catch (error) {
    await transaction.rollback();
    console.error('❌ Error completing token:', error);
    throw error;
  }
};


/**
 * Add emergency token
 */
const addEmergencyToken = async (
  phone_number,
  extra = {}
) => {
  return generateToken(phone_number, 1, extra);
};


/**
 * Get full queue state
 */
const getQueueState = async () => {

  try {

    const currentToken = await Token.findOne({
      where: { status: 'in_progress' },
      order: [['updated_at', 'DESC']]
    });

    const waitingList = await Token.findAll({
      where: { status: 'waiting' },
      order: [
        ['priority', 'ASC'],
        ['created_at', 'ASC']
      ]
    });

    const completedCount = await Token.count({
      where: { status: 'completed' }
    });

    const totalCount = await Token.count();

    return {
      current_token: currentToken,
      waiting_list: waitingList,
      completed_count: completedCount,
      total_count: totalCount
    };

  } catch (error) {
    console.error('❌ Error getting queue state:', error);
    throw error;
  }
};


module.exports = {
  generateToken,
  callNextToken,
  completeCurrentToken,
  addEmergencyToken,
  getQueueState
};
