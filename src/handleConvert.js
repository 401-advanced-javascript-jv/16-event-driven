'use strict';

const eventEmitter = require('./event-emitter.js');
const eventNames = require('./event-names.js');

/**
 * Event handler to take a buffer and convert it to an uppercase string, then
 * convert back to a buffer. Fires the WRITE event to save to file.
 * @param fileBuffer
 * @param filename
 */
const handleConvert = (fileBuffer, filename) => {
  let newString = fileBuffer.toString().toUpperCase();
  let newBuffer = Buffer.from(newString);
  eventEmitter.emit(eventNames.WRITE, `new-${filename}`, newBuffer);
};

eventEmitter.on(eventNames.CONVERT, handleConvert);

