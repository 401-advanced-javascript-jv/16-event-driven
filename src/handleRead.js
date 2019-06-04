'use strict';

const fs = require('fs').promises;
const eventEmitter = require('./event-emitter.js');
const eventNames = require('./event-names.js');

/**
 * Event handler function to read a given file to a buffer. Fires the CONVERT
 * event once the file has been read. The buffer is
 * @param {string} file
 */
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
