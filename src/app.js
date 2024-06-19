/**
 * Configures loading .env file
 */
require('dotenv').config()

const express = require('express');
const app = express();

/**
 * Configures request logger
 */
const morgan = require('morgan');
app.use(morgan('dev'));

/**
 * Configures JSON parse
 */
app.use(express.json());

app.set('view engine', 'ejs');

/**
 * Import and configure db
 */
const { init: initDb } = require('./db')
initDb(app)
/**
 * Configures universal plugin
 */
require('./routes/univesal-plugin')(app)
/**
 * Configures messages CRUD routes
 */
require('./routes/messages')(app)
/**
 * Exposes root route
 */
app.get('/', (req, res) => {
  res.render('index', { title: "What's New" });
});
/**
 * Exposes public dir
 */
app.use(express.static('public'));

module.exports = app