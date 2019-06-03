'use strict';

const eventEmitter = require('./event-emitter.js');
const eventNames = require('./event-names.js');

eventEmitter.on(eventNames.ERROR, (error) => {
  throw error;
});
