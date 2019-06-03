'use strict';

const eventEmitter = require('./src/event-emitter.js');
const eventNames = require('./src/event-names.js');

require('./src/handleRead.js');
require('./src/handleConvert.js');
require('./src/handleWrite.js');
require('./src/logger.js');
require('./src/errorHandler.js');

let file = process.argv.slice(2).shift();

eventEmitter.emit(eventNames.READ, file);
