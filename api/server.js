'use strict';

const app = require('./config/express')();

if(app.get('env') == 'test' ||
   app.get('env') == 'development') {
   const http = require('http').createServer(app);
   http.listen(app.get('httpPort'), '0.0.0.0', () => {
    console.log(`Express Server listening to ${app.get('httpPort')}`);
   });
}
