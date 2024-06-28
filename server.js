var express = require('express');
var bodyParser = require('body-parser');
require('express-async-errors');
require('dotenv').config();
const moment = require('moment-timezone');
const logger = require('morgan');
const swaggerUI = require('swagger-ui-express');
const swaggerDocument = require('./swagger');
const screenshotRouter = require('./app/routes/screenshot.js');
const cron = require('./app/cron.js')
// create express app
var app = express();
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
// router
logger.token('date', (req, res, tz) => {
    return moment().tz(tz).format();
  })
app.use(logger(':remote-addr - :remote-user [:date[Asia/Ho_Chi_Minh]] ":method :url HTTP/:http-version" :status  - :response-time ms'));
app.use('/images', express.static('images'));
app.use('/api',screenshotRouter);
app.use('/api/docs',swaggerUI.serve, swaggerUI.setup(swaggerDocument))
cron
//handler 404 page not found
app.use(function (req, res, next) {
    return res.status(404).send({"message": "Router not found"})
    next()
  })
// error handler
app.use(function(err,req,res,next){
    console.log(err.stack);
    res.status(500).json({
        "error_message": "Something broke !"
    })
})
// listen for requests
global.PORT = process.env.PORT || 3000;
global.HOST = process.env.HOST || 'localhost';
app.listen(global.PORT, function(){
    console.log(`Server is listening on port http://${global.HOST}:${global.PORT}`);
});
