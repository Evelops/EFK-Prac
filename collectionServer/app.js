const express = require('express')();
const logger = require('./winston/logger');

const app = express();

const fluentLogger = require('fluent-logger');

const port = 8080;

// root router
app.get('/',(req,res)=>{
    logger.info('GET/');
    console.log('Root Router');
});

app.get('/error',(req,res) => {
    logger.error('ERR MSG');
    res.sendStatus(500);
});

// run express webServer
app.listen(port,()=>{
    logger.info('Sever listening on port : 8080');
    console.log(`Express server Run, PORT:${port}`);
});
