'use strict';

const eventEmitter = require('./event-emitter.js');
const eventNames = require('./event-names.js');

const handleConvert = (fileBuffer, filename) => {
  let newString = fileBuffer.toString().toUpperCase();
  let newBuffer = Buffer.from(newString);
  eventEmitter.emit(eventNames.WRITE, `new-${filename}`, newBuffer);
};

eventEmitter.on(eventNames.CONVERT, handleConvert);

