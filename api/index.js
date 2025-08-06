const serverless = require('serverless-http');
const app = require('../app');
const connectToDatabase = require('../utils/db');

let handler; // cached handler

module.exports = async (req, res) => {
  try {
    if (!handler) {
      await connectToDatabase();         // 👈 Ensure DB is connected
      handler = serverless(app);         // 👈 Create handler once
    }
    return handler(req, res);            // 👈 Return the handler
  } catch (err) {
    console.error('Function crashed:', err);
    res.statusCode = 500;
    res.end('Internal Server Error');
  }
};
