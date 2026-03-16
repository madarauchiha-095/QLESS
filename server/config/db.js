const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: 'postgres',
    logging: process.env.NODE_ENV === 'development' ? console.log : false,
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  }
);

// Test database connection
const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log('✅ Database connection established successfully.');
    
    // Sync database (create tables if they don't exist)
    await sequelize.sync({ alter: true });
    console.log('✅ Database models synchronized.');
    return true;
  } catch (error) {
    console.error('❌ Unable to connect to the database:', error.message);
    console.error('💡 Make sure PostgreSQL is running and credentials are correct in .env');
    
    // In development, allow server to start without DB (for testing API structure)
    if (process.env.NODE_ENV === 'development' && process.env.ALLOW_NO_DB === 'true') {
      console.warn('⚠️  Server starting without database connection (development mode)');
      return false;
    }
    
    console.error('❌ Exiting... Please fix database connection and try again.');
    process.exit(1);
  }
};

module.exports = { sequelize, connectDB };
