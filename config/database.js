require('dotenv').config();
const mongoose = require('mongoose');
const DB_URL = process.env.DB_URI || 'mongodb://localhost:27017/foodies';

const dbConnection = mongoose
  .connect(DB_URL)
  .then(() => console.log('Mongo connection open.'))
  .catch(err => console.log('Mongo connection error.', err));

module.exports = { dbConnection, DB_URL };
