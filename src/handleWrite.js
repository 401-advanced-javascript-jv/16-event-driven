'use strict';

const fs = require('fs').promises;
const eventEmitter = require('./event-emitter.js');
const eventNames = require('./event-names.js');

const handleWrite = (filename, buffer) => {
  fs.writeFile(filename, buffer)
    .then(() => {
      eventEmitter.emit(eventNames.LOG, `${filename} written out`);
    })
    .catch((error) => {
      eventEmitter.emit(eventNames.ERROR, error);
    });
};

eventEmitter.on(eventNames.WRITE, handleWrite);
