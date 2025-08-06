const mongoose = require('mongoose');

let isConnected;

module.exports = async function connectToDatabase() {
  if (isConnected) return;

  await mongoose.connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  isConnected = true;
};
