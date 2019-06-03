'use strict';

const fs = require('fs').promises;
const EventEmitter = require('events');
const eventEmitter = new EventEmitter();

const eventNames = {
  READ: 'READ',
  CONVERT: 'CONVERT',
  TO_BUFFER: 'TO_BUFFER',
  WRITE: 'WRITE',
  ERROR: 'ERROR',
  LOG: 'LOG',
};

const handleRead = (file) => {
  fs.readFile(file)
    .then((buffer) => {
      eventEmitter.emit(eventNames.CONVERT, buffer);
    })
    .catch((error) => {
      eventEmitter.emit(eventNames.ERROR, error);
    });
};

const handleConvert = (fileBuffer) => {
  let newString = fileBuffer.toString().toUpperCase();
  eventEmitter.emit(eventNames.TO_BUFFER, newString);
};

const handleCreateBuffer = (string) => {
  let newBuffer = Buffer.from(string);
  eventEmitter.emit(eventNames.WRITE, `new-${file}`, newBuffer);
};

const handleWrite = (file, buffer) => {
  fs.writeFile(file, buffer)
    .then(() => {
      eventEmitter.emit(eventNames.LOG, `${file} written out`);
    })
    .catch((error) => {
      eventEmitter.emit(eventNames.ERROR, error);
    });
};

eventEmitter.on(eventNames.READ, (file) => handleRead(file));
eventEmitter.on(eventNames.CONVERT, (buffer) => handleConvert(buffer));
eventEmitter.on(eventNames.TO_BUFFER, (string) => handleCreateBuffer(string));
eventEmitter.on(eventNames.WRITE, (file, buffer) => handleWrite(file, buffer));
eventEmitter.on(eventNames.LOG, (payload) => console.log(payload));

eventEmitter.on(eventNames.ERROR, (error) => {
  throw error;
});

let file = process.argv.slice(2).shift();
eventEmitter.emit(eventNames.READ, file);
