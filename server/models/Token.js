const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const Token = sequelize.define('Token', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },

  token_number: {
    type: DataTypes.INTEGER,
    allowNull: false,
    unique: true
  },

  phone_number: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },

  // ✅ NEW FIELDS
  name: {
    type: DataTypes.STRING,
    allowNull: true
  },

  age: {
    type: DataTypes.INTEGER,
    allowNull: true
  },

  problem: {
    type: DataTypes.TEXT,
    allowNull: true
  },

  source: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: 'web' // web | sms | voice
  },

  status: {
    type: DataTypes.ENUM('waiting', 'in_progress', 'completed'),
    allowNull: false,
    defaultValue: 'waiting'
  },

  priority: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 2,
    validate: {
      min: 1,
      max: 2
    },
    comment: '1 = emergency, 2 = normal'
  },

  estimated_time: {
    type: DataTypes.DATE,
    allowNull: true
  },

  created_at: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW
  },

  updated_at: {
    type: DataTypes.DATE,
    allowNull: true
  }

}, {
  tableName: 'tokens',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at',
  indexes: [
    { fields: ['status'] },
    { fields: ['priority', 'created_at'] }
  ]
});

module.exports = Token;
