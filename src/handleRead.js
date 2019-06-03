'use strict';

const fs = require('fs').promises;
const eventEmitter = require('./event-emitter.js');
const eventNames = require('./event-names.js');

const handleRead = (file) => {
  fs.readFile(file)
    .then((buffer) => {
      eventEmitter.emit(eventNames.CONVERT, buffer, file);
    })
    .catch((error) => {
      eventEmitter.emit(eventNames.ERROR, error);
    });
};

eventEmitter.on(eventNames.READ, handleRead);
