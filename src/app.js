/**
 * Configures loading .env file
 */
require('dotenv').config()
require('./bootstrap')
const express = require('express');
const app = express();



/**
 * Error handler
 */
const asyncWrapper = global.asyncWrapper = (fn, options = {}) => (req, res, next) => {
  fn(req, res, next).catch((err) => {
    const errorResponse = {
      status: options.status || 500,
      message: options.message || 'Internal Server Error',
      errorCode: global.errorCode || options.errorCode || 'SERVER_ERROR',
      errorDetails: err.message
    };
    delete global.errorCode
    res.status(errorResponse.status).send(errorResponse);
  });
};

/**
 * Configures request logger
 */
const morgan = require('morgan');
app.use(morgan('dev'));

/**
 * Configures JSON parse
 */
app.use(express.json());

app.use(require('cors')('*'))

app.set('view engine', 'ejs');

/**
 * Import and configure db
 */
const { init: initDb } = require('./db')
initDb(app)


const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('../swagger');
// Swagger UI
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

/**
 * Configures universal plugin
 */
require('./routes/univesal-plugin')(app)
/**
 * Configures messages CRUD routes
 */
require('./routes/messages')(app)

const newsApiRoutes = require('./routes/news-api');
// Use the news API routes
app.use('/api', newsApiRoutes);

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


// Run migration on app start
const { migrateMessagesToNews } = require('./migrations');
migrateMessagesToNews().catch(console.error);

module.exports = app